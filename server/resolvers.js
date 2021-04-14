// const { User, Instructor, Message, Reaction } = require('../../models')
const { UserInputError, AuthenticationError, ForbiddenError, withFilter } = require('apollo-server')
const { PubSub } = require('apollo-server')
const { v4: uuidv4 } = require('uuid');

// pub sub instance for gql subscription, pass it down to resolvers
// TODO: SWITCH THIS TO PUBSUBENGINE IN PRODUCTION
const pubsub = new PubSub()


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

                const collection = db.collection("messages");
                collection.insertOne(message, (err, res) => {
                    if (err) console.log(err);
                });

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
            }, ({ newMessage }, { username },) => {
                // user can only see messages that are to or from them

                // newMessage from parent contains the new message object

                // return true if either message is from user or to user
                return newMessage.to === username || newMessage.from === username

            })
        },

    }

}