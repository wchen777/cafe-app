const User = require('../models/user')
const { UserInputError, AuthenticationError, ForbiddenError, ValidationError } = require('apollo-server')


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
        registerUser: async (parent, data) => {
            try {
            // TODO: register user logic with db model
            User.find({ username: data.username })
            .exec((err, users) => {
                if (users.length > 0){
                throw new ValidationError;
                }
                const user = new User({
                    username: data.username,
                    first: data.first,
                    last: data.last,
                    email: data.email,
                    ig: data.ig ?? "",
                    portfolio: data.portfolio ?? "",
                    twitter: data.twitter ?? "",
                    permissions: data.permissions,
                });
                user.save(function (err) {
                    if (err) {
                    console.log(err);
                    return next(err);
                    }
                    // Genre saved. Redirect to genre detail page.
                    res.json({ message: "user created" });
                });
                })
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
