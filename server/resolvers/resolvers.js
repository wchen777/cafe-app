const chatResolvers = require('./ChatResolvers')
const userResolvers = require('./UserResolvers')
// const postResolvers = require('./PostResolvers')

module.exports = {
    Query: {
        ...chatResolvers.Query,
        ...userResolvers.Query,
        // ...postResolvers.Query,
    },
    Mutation: {
        ...chatResolvers.Mutation,
        ...userResolvers.Mutation,
        // ...postResolvers.Mutation,
    },
    Subscription: {
        ...chatResolvers.Subscription,
        ...userResolvers.Subscription,
    }
}