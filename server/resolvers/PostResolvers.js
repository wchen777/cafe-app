const Creation = require("../models/creation");
const Post = require("../models/post");
const User = require("../models/user");


const {
  UserInputError,
  AuthenticationError,
  ForbiddenError,
  ValidationError,
} = require("apollo-server");

module.exports = {
  Query: {
    //  need to think on this method
  //   getPostsForUser: async (_, { username }, __) => {
  //     try {
  //       const posts = await Post.find({ _id: id }).exec();
  //       return posts;
  //     } catch (err) {
  //       console.log(err);
  //       throw err;
  //     }
  // },
    getPostById: async (_, { id }, __) => {
      try {
        const post = await Post.findOne({ _id: id });
        return post;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
  },
  Mutation: {
    createPost: async (_, data, __) => {
      try {
        console.log(data)
        const creation = await Creation.findOne({ _id: data.creationId }).exec();
        console.log(creation)
        const poster = await User.findOne({ username: data.posterName }).exec();
        console.log(poster)
        let post = {};
        // create the user doc
        if (creation && poster) {
          post = new Post({
            poster,
            creation,
            likes: 0,
            comments: [],
          });
          post.save(function (err) {
            if (err) {
              throw err;
            }
          });
        }
        console.log("asdf", post, "asdf");
        return post;
      } catch (err) {
        console.log(err, "caught error");
        throw err;
        // TODO: GRAPHQL ERRORS FOR GRACEFUL HANDLING
      }
    },
    editPost: async (_, data, __) => {
      try {
        const filter = { _id: data.id };
        // update information is everything that is passed into data except the username
        const updatedPost = await Post.findOneAndUpdate(filter, data, {
          returnOriginal: false,
          useFindAndModify: false,
        });
        console.log(updatedPost, "updated")
        return updatedPost;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
  },
};