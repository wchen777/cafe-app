const chatResolvers = require('./ChatResolvers')
const userResolvers = require('./UserResolvers')

module.exports = {
    Query: {
        ...chatResolvers.Query,
        ...userResolvers.Query
    },
    Mutation: {
        ...chatResolvers.Mutation,
        ...userResolvers.Mutation
    },
    Subscription: {
        ...chatResolvers.Subscription,
        ...userResolvers.Subscription,
    }
}