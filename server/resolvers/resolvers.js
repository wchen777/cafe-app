const chatResolvers = require('./ChatResolvers')

module.exports = {
    Query: {
        ...chatResolvers.Query
    },
    Mutation: {
        ...chatResolvers.Query
    },
    Subscription: {
        ...chatResolvers.Subscription
    }
}