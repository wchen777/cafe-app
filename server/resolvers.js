// const { User, Instructor, Message, Reaction } = require('../../models')
const { UserInputError, AuthenticationError, ForbiddenError, withFilter } = require('apollo-server')
const { PubSub } = require('apollo-server')
const { v4: uuidv4 } = require('uuid');

// pub sub instance for gql subscription, pass it down to resolvers
const pubsub = new PubSub()

const MongoClient = require('mongodb').MongoClient;
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

module.exports = {
    Query: {
        getMessages: async (parent, { to, from }, { db }) => {
            try {
                
                // get messages that come from or are sent by either the to or from users
                const query = { 
                    "to" : { $in : [ to, from] },
                    "from" : { $in : [ to, from] }
                }
                const projection = { "_id": 0 };

                let messages

                const collection = db.collection("messages");

                messages = await collection.find(query, projection)
                    .toArray()
                    .then(msgs => {
                        console.log(`Successfully found ${msgs.length} messages.`)
                        msgs.forEach(console.log)
                        return msgs
                    })
                    .catch(err => console.error(`Failed to find messages: ${err}`))                

                return messages
            } catch (err) {
                console.log(err)
                throw err
            }
        }
    },
    Mutation: {
        sendMessage: async (parent, { to, from, content }, { db }) => {
            try {

                // new message instance
                const message = {
                    to: to,
                    from: from,
                    content: content,
                    uuid: uuidv4(),
                    createdAt: new Date().toISOString()
                }

                // await Message.create({
                //     from: user.username,
                //     to,
                //     content,


                const collection = db.collection("messages");
                collection.insertOne(message, (err, res) => {
                    if (err) console.log(err);
                });

                // if (!user) throw new AuthenticationError('unauthenticated')

                // // find recipient based on whether user is instructor or not
                // const recipient = user.isInstructor ?
                //     await User.findOne({ where: { username: to } }) :
                //     await Instructor.findOne({ where: { username: to } })

                // error checking and validation
                // if (!recipient) {
                //     throw new UserInputError('user not found')
                // } else if (recipient.username == user.username) {
                //     throw new UserInputError('cannot message yourself')
                // }

                // if (content.trim() === '') {
                //     throw new UserInputError('message is empty')
                // }

                // new message instance
                // const message = await Message.create({
                //     from: user.username,
                //     to,
                //     content,
                // })

                // fire subscription whenever new message is published for listener
                pubsub.publish('NEW_MESSAGE', { newMessage: message })

                return message

            } catch (err) {
                console.log(err)
                throw err
            }
        },

    },
    Subscription: {
        // gql subscription w/ pub sub listener, for receiving messages
        newMessage: {
            subscribe: withFilter((_, __, ___) => {

                return pubsub.asyncIterator('NEW_MESSAGE')
            }, ({ newMessage }, _, __) => {
                // verify whether or not the logged in user is able to see the message
                // user can only see messages that are to or from them

                // newMessage from parent contains the new message object

                // return true if either message is from user or to user
                // return (newMessage.from === user.username || newMessage.to === user.username)
                return true

            })
        },

    }

}