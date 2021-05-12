const chatResolvers = require('./ChatResolvers')

module.exports = {
    Query: {
        ...chatResolvers.Query
    },
    Mutation: {
        ...chatResolvers.Mutation
    },
    Subscription: {
        ...chatResolvers.Subscription
    }
}