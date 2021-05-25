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
                const update = _.omit(data, 'username')

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
        followHandler: async (_, { usernameSelf, usernameFollowed, isFollow }, { tokenValid }) => {
            try {

                // auth check
                if (!tokenValid) {
                    throw new AuthenticationError;
                }

                const selfFilter = { username: usernameSelf }
                const followedFilter = { username: usernameFollowed }

                // updating the followed or following list depending on the user

                // if following (not unfollowing, selfUser does not already follows the followedUser)
                // then push the followed to the following list, 
                // if unfollowing, pull
                const selfUpdate =
                    isFollow ?
                        { $push: { following: usernameFollowed } } :
                        { $pull: { following: usernameFollowed } }

                // likewise with followed acc except with the followers list
                const followedUpdate =
                    isFollow ?
                        { $push: { followers: usernameSelf } } :
                        { $pull: { followers: usernameSelf } }

                const selfUser = await User.findOneAndUpdate(selfFilter, selfUpdate, {
                    returnOriginal: false
                })

                const selfUser = await User.findOneAndUpdate(followedFilter, followedUpdate, {
                    returnOriginal: false
                })


                return selfUser
            } catch (err) {
                console.log(err)
                // throw err
            }
        },
    }
}
