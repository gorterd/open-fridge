const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const CommentSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'users',
    },

    text: {
        type: String,
        required: true
    },

    section: {
        key: String,
        index: String
    },

    date: {
        type: Date,
        default: Date.now,
    },
    
});

module.exports = Comment = mongoose.model('Comment', CommentSchema);