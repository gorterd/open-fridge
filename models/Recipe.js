const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },

  name: {
    type: String,
    required: true,
  },

  ingredients: [
    {
      amount: String,
      unit: String,
      name: String,
      fullName: String,
      prep: String,
    },
  ],

  instructions: [String],

  time: { total: String },

  servings: {
    type: String,
    required: true,
  },

  image: {
    type: String,
  },

  date: {
    type: Date,
    default: Date.now,
  },

  source: String,

  url: String,

  // comments: [ Comment ]
});

module.exports = Recipe = mongoose.model('Recipe', RecipeSchema);
