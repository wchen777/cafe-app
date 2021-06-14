const chatResolvers = require('./ChatResolvers')
const userResolvers = require('./UserResolvers')
const postResolvers = require('./PostResolvers')
const creationResolvers = require('./CreationResolvers')


module.exports = {
    Query: {
        ...chatResolvers.Query,
        ...userResolvers.Query,
        ...postResolvers.Query,
        ...creationResolvers.Query,

    },
    Mutation: {
        ...chatResolvers.Mutation,
        ...userResolvers.Mutation,
        ...postResolvers.Mutation,
        ...creationResolvers.Mutation,
    },
    Subscription: {
        ...chatResolvers.Subscription,
        ...userResolvers.Subscription,
    }
}