const mongoose = require('mongoose');
// Define schema
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  email: {type: String, required: true},
  bio: {type: String},
	permissions: {type: String, required: true, enum: ['Admin', 'User', 'Creator']},
});

// Compile model from schema

module.exports = mongoose.model('Post', UserSchema );