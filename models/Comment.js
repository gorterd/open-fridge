const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const CommentSchema = new Schema({
    author: {
        _id: {
            type: Schema.Types.ObjectId,
            ref: 'users',
        },

        username: String
    },

    recipe: {
        type: Schema.Types.ObjectId,
        ref: 'recipes',
    },

    text: {
        type: String,
        required: true
    },

    section: {
        key: String,
        idx: String
    },

    date: {
        type: Date,
        default: Date.now,
    },

});

module.exports = Comment = mongoose.model('Comment', CommentSchema);