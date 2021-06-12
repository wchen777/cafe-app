// const Post = require("../models/post");
// const {
//   UserInputError,
//   AuthenticationError,
//   ForbiddenError,
//   ValidationError,
// } = require("apollo-server");

// module.exports = {
//   Query: {
//     getUserByUsername: async (parent, { username }, { tokenValid }) => {
//       try {
//         // auth check
//         if (!tokenValid) {
//           throw new AuthenticationError();
//         }

//         const user = await User.findOne({ username }).exec();

//         return user;
//       } catch (err) {
//         console.log(err);
//         throw err;
//       }
//     },
//     getUserByEmail: async (_, { email }, { tokenValid }) => {
//       try {
//         // auth check
//         if (!tokenValid) {
//           throw new AuthenticationError();
//         }

//         const user = await User.findOne({ email }).exec();

//         console.log("email query", user);

//         return user;
//       } catch (err) {
//         console.log(err);
//         throw err;
//       }
//     },
//   },
//   Mutation: {
//     isDuplicateEmailCheck: async (_, { email }, __) => {
//       try {
//         const filter = {
//           email,
//         };

//         const dupeUser = await User.findOne(filter);

//         // boolean of whether dupeUser exists or not
//         return !!dupeUser;
//       } catch (err) {
//         console.log(err);
//         throw err;
//       }
//     },
//     registerUser: async (_, data, __) => {
//       try {
//         console.log(data.username, "username");
//         const filter = {
//           $or: [{ username: data.username }, { email: data.email }],
//         };
//         // look for the username first
//         const dupeUser = await User.findOne(filter);

//         console.log(dupeUser);

//         // if we have a duplciate user name or email
//         if (dupeUser) {
//           console.log("dupe user");
//           // TODO: FIX THIS VALIDATION ERROR
//           throw new ValidationError(
//             "an account with the same username or email address already exists"
//           );
//         }

//         const ig = data.ig ? data.ig : "";
//         const portfolio = data.portfolio ? data.portfolio : "";
//         const twitter = data.twitter ? data.twitter : "";
//         const permissions = data.permissions ? data.permissions : "User";

//         // create the user doc
//         const user = new User({
//           username: data.username,
//           first: data.first,
//           last: data.last,
//           email: data.email,
//           ig: ig,
//           portfolio: portfolio,
//           twitter: twitter,
//           permissions: permissions,
//           bio: "",
//           pic: "",
//         });

//         // save it
//         user.save(function (err) {
//           if (err) {
//             throw err;
//           }
//         });

//         // send back user object
//         return user;
//       } catch (err) {
//         console.log(err, "caught error");
//         throw err;
//         // TODO: GRAPHQL ERRORS FOR GRACEFUL HANDLING
//       }
//     },
//     editUserProfile: async (_, data, { tokenValid }) => {
//       try {
//         console.log("hit", data);
//         // auth check
//         if (!tokenValid) {
//           throw new AuthenticationError();
//         }

//         const filter = { username: data.username };

//         // TODO: ERROR CHECKING + VALIDATION

//         // update information is everything that is passed into data except the username
//         const updatedUser = await User.findOneAndUpdate(filter, data, {
//           returnOriginal: false,
//           useFindAndModify: false,
//         });

//         return updatedUser;
//       } catch (err) {
//         console.log(err);
//         throw err;
//       }
//     },
//     followHandler: async (
//       _,
//       { usernameSelf, usernameFollowed, isFollow },
//       { tokenValid }
//     ) => {
//       try {
//         // auth check
//         if (!tokenValid) {
//           throw new AuthenticationError();
//         }

//         const selfFilter = { username: usernameSelf };
//         const followedFilter = { username: usernameFollowed };

//         // updating the followed or following list depending on the user

//         // if following (not unfollowing, selfUser does not already follows the followedUser)
//         // then push the followed to the following list,
//         // if unfollowing, pull
//         const selfUpdate = isFollow
//           ? { $push: { following: usernameFollowed } }
//           : { $pull: { following: usernameFollowed } };

//         // likewise with followed acc except with the followers list
//         const followedUpdate = isFollow
//           ? { $push: { followers: usernameSelf } }
//           : { $pull: { followers: usernameSelf } };

//         const selfUser = await User.findOneAndUpdate(selfFilter, selfUpdate, {
//           returnOriginal: false,
//         });

//         const otherUser = await User.findOneAndUpdate(
//           followedFilter,
//           followedUpdate,
//           {
//             returnOriginal: false,
//           }
//         );

//         return selfUser;
//       } catch (err) {
//         console.log(err);
//         throw err;
//       }
//     },
//   },
// };
