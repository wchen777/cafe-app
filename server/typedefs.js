const { gql } = require('apollo-server')

module.exports = gql`
    type Message{
        uuid: String!
        content: String!
        from: String!
        to: String!
        createdAt: String!
    }
    type Query {
        getMessages(
            to: String!
            from: String!
            ): [Message]!
    }
    type Mutation{
        sendMessage(
            to: String!
            from: String!
            content: String!
        ): Message!
    }
    type Subscription{
        newMessage(username: String!): Message!
    }
`