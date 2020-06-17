const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Recipe = require('./Recipe').schema;

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
    pinnedRecipes: [ Recipe ]
});

module.exports = User = mongoose.model('User', UserSchema);




