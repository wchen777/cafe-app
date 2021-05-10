const user = require('../models/user')

module.exports = {
    Query: {
        getUserByUsername: async (parent, data, { db }) => {
            try {
                // TODO: register user logic with db model

            } catch (err) {
                console.log(err)
                // throw err
            }
        },
    },
    Mutation: {
        registerUser: async (parent, data, { db }) => {
            try {
                // TODO: register user logic with db model

            } catch (err) {
                console.log(err)
                // throw err
            }
        },
        editUserInfo: async (parent, data, { db }) => {
            try {
                // TODO: edit user info with db model

            } catch (err) {
                console.log(err)
                // throw err
            }
        },
    }
}
