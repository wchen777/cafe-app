const { gql } = require('apollo-server')

module.exports = gql`
    type User {
        username: String!
        id: String
        first: String!
        last: String!
        email: String!
        ig: String
        portfolio: String 
        twitter: String
        following: [String]
        followers: [String]
        liked: [String]
        chats: [String]
        bio: String
        pic: String
        permissions: String
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
        getUserByEmail(
            email: String!
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
            first: String!
            last: String!
            email: String!
            ig: String
            portfolio: String 
            twitter: String
            permissions: String
        ): User
        editUserProfile(
            username: String!
            first: String
            last: String
            ig: String
            portfolio: String
            twitter: String
            pic: String
            bio: String
        ): User!
        followHandler(
            usernameSelf: String!
            usernameFollowed: String!
            isFollow: Boolean!
        ): User!
    }
    type Subscription {
        newMessage(username: String!): Message!
    }
`