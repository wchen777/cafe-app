const mongoose = require('mongoose');
// Define schema
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    poster: { type: Schema.Types.ObjectId, ref: 'User' },
    likes: { type: Number },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
});

// Compile model from schema

module.exports = mongoose.model('Post', PostSchema);