const mongoose = require('mongoose');
// Define schema
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  author: {type: Schema.Types.ObjectId, ref: 'User'},
	likes: {type: Number},
	text: {type: String, required: true},
  replies: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
});

// Compile model from schema

module.exports = mongoose.model('Post', CommentSchema );