const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Recipe = require('./Recipe').schema;
const Comment = require('./Comment').schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },

    pinnedRecipes: [ Recipe ],

    comments: [ Comment ]
});

module.exports = User = mongoose.model('User', UserSchema);




