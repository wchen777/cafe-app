const { gql } = require("apollo-server");

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
  type Message {
    uuid: String!
    content: String!
    from: String!
    to: String!
    createdAt: String!
    _id: ID
  }
  type Creation {
    type: String!
    category: String!
    author: User!
    imageUrl: String
    text: String
    audioUrl: String
    description: String
  }
  type Post {
    poster: User!
    id: String!
    creation: Creation!
    likes: String
    # comments: [Comment]
  }
  type Query {
    getMessages(to: String!, from: String!): [Message]!
    getUserByUsername(username: String!): User!
    getUserByEmail(email: String!): User!
    testQuery: Message!
    getPosts(user: String!): [Post]!
    getPostById(id: String!): Post!
    getCreationById(id: String!): Creation!
  }
  type Mutation {
    isDuplicateEmailCheck(email: String!): Boolean!
    sendMessage(to: String!, from: String!, content: String!): Message!
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
    createPost(
      posterName: String!
      likes: String
      # comments: [Comment]
      creationId: String!
    ): Post!
    editPost(
      posterName: String!
      likes: String
      # comments: [Comment]
      creation: String
      id: String!
    ): Post!
    createCreation(
      type: String!
      category: String!
      authorName: String!
      imageUrl: String
      audioUrl: String
      description: String
    ): Creation!
    editCreation(
      id: String!
      type: String
      category: String
      authorName: String
      imageUrl: String
      audioUrl: String
      description: String
    ): Creation!
  }
  type Subscription {
    newMessage(username: String!): Message!
  }
`;
