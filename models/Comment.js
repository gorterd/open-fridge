const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const CommentSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'users',
    },

    body: {
        type: String,
        required: true
    },

    type: {
        key: String,
        property: String,
        // index: String,
    },

    date: {
        type: Date,
        default: Date.now,
    },
    
});

module.exports = Comment = mongoose.model('Comment', CommentSchema);