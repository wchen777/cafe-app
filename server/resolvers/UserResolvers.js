const User = require('../models/user')
const { UserInputError, AuthenticationError, ForbiddenError, ValidationError } = require('apollo-server')

module.exports = {
    Query: {
        getUserByUsername: async (parent, { username }, { tokenValid }) => {
            try {

                // auth check
                if (!tokenValid) {
                    throw new AuthenticationError;
                }

                const user = await User.findOne({ username }).exec()

                return user

            } catch (err) {
                console.log(err)
                // throw err
            }
        },
    },
    Mutation: {
        registerUser: async (_, data, __) => {
            try {

                // look for the username first
                User.find({ username: data.username })
                    .exec((err, users) => {

                        // if user exists, throw a validation error
                        if (users.length > 0) {
                            throw new ValidationError;
                        }

                        // create the user doc
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

                        // save it
                        user.save(function (err) {
                            if (err) {
                                throw err;
                            }
                        });
                    })
            } catch (err) {
                console.log(err)
                // throw err 
            }
        },
        editUserProfile: async (_, data, { tokenValid }) => {
            try {

                // auth check
                if (!tokenValid) {
                    throw new AuthenticationError;
                }

                const filter = { username: data.username };
                const update = _.omit(filter, 'username')

                console.log("update info", update)

                // update information is everything that is passed into data except the username
                const updatedUser = await User.findOneAndUpdate(filter, update, {
                    returnOriginal: false
                })

                return updatedUser
            } catch (err) {
                console.log(err)
                // throw err
            }
        },
        followUser: async (_, data, { tokenValid }) => {
            try {

                // auth check
                if (!tokenValid) {
                    throw new AuthenticationError;
                }

                const filter = { username: data.username };
                const update = _.omit(filter, 'username')

                console.log("update info", update)

                // update information is everything that is passed into data except the username
                const updatedUser = await User.findOneAndUpdate(filter, update, {
                    returnOriginal: false
                })

                return updatedUser
            } catch (err) {
                console.log(err)
                // throw err
            }
        },
    }
}
