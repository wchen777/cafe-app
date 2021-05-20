const mongoose = require('mongoose');
// Define schema
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: { type: String, required: true },
    id: { type: String, required: true },
    first: { type: String, required: true },
    last: { type: String, required: true },
    email: { type: String, required: true },
    ig: { type: String, required: false },
    portfolio: { type: String, required: false },
    twitter: { type: String, required: false },
    following: [{ type: String, required: false }],
    followers: [{ type: String, required: false }],
    liked: [{ type: String, required: false }],
    chats: [{ type: String, required: false }],
    pic: { type: String, required: false },
    bio: { type: String, required: false },
    permissions: { type: String, required: true, enum: ['Admin', 'User', 'Creator'] },
});

// Compile model from schema

module.exports = mongoose.model('User', UserSchema);