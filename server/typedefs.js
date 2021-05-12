const { gql } = require('apollo-server')

module.exports = gql`
    type User {
        username: String!
        password: String!
        id: String!
        first: String!
        last: String!
        email: String!
        ig: String
        portfolio: String 
        twitter: String
        following: [String]!
        followers: [String]!
        liked: [String]!
        chats: [String]!
        bio: String
        permissions: String!
    }
    type Message{
        uuid: String!
        content: String!
        from: String!
        to: String!
        createdAt: String!
        _id: ID
    }
    type Query {
        getMessages(
            to: String!
            from: String!
            ): [Message]!
        getUserByUsername(
            username: String!
        ): User!
        testQuery: Message!
    }
    type Mutation{
        sendMessage(
            to: String!
            from: String!
            content: String!
        ): Message!
        registerUser(
            username: String!
            password: String!
            first: String!
            last: String!
            email: String!
            ig: String
            portfolio: String 
            twitter: String
            permissions: String!
        ): User!
    }
    type Subscription{
        newMessage(username: String!): Message!
    }
`