const mongoose = require('mongoose');
// Define schema
const Schema = mongoose.Schema;

const WorkSchema = new Schema({
    type: { type: String, required: true, enum: ['text', 'audio', 'image',] },
    category: { type: String, required: true, enum: ['painting', 'photograph', 'abstract'] },
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    imageUrl: { type: String },
    text: { type: String },
    audioUrl: { type: String },
    description: { type: String },

});

// Compile model from schema

module.exports = mongoose.model('Post', WorkSchema);