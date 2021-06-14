const Creation = require("../models/creation");
const User = require("../models/user");


const {
  UserInputError,
  AuthenticationError,
  ForbiddenError,
  ValidationError,
} = require("apollo-server");

module.exports = {
  Query: {
    getCreationById: async (_, { id }, __) => {
      try {
        const creation = await Creation.findOne({ _id: id }).exec();
        return creation;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
  },
  Mutation: {
    createCreation: async (_, data, __) => {
      try {
        console.log(data)

        const type = (data.type === "text" || data.type === "audio" || data.type === "image" )? data.type : "image";
        const category = (data.category === "painting" || data.category === "photograph" || data.category === "abstract") ? data.category : "painting";
        const username = data.authorName ? data.authorName : "";
        const author = await User.findOne({ username });
        console.log(author);
        let creation = {};
        // create the user doc
        if (author) {
          creation = new Creation({
            author,
            type,
            category,
            imageUrl: data.imageUrl,
            text: data.text,
            audioUrl: data.audioUrl,
            description: data.description,
          });
          creation.save(function (err) {
            if (err) {
              throw err;
            }
          });
        }
        console.log(creation)
        return creation;
      } catch (err) {
        console.log(err, "caught error");
        throw err;
        // TODO: GRAPHQL ERRORS FOR GRACEFUL HANDLING
      }
    },
    editCreation: async (_, data, __) => {
      try {
        const filter = { _id: data.id };
        // update information is everything that is passed into data except the username
        const updatedCreation = await Creation.findOneAndUpdate(filter, data, {
          returnOriginal: false,
          useFindAndModify: false,
        });
        console.log(updatedCreation, "updated")
        return updatedCreation;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
  },
};
