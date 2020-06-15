const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RecipeSchema = new Schema({

  name: {
    type: String,
    required: true
  },

  ingredients: [
    { 
      amount: String,
      unit: String,
      ingredient: String,
      prep: String
    }
  ],

  instructions: [ String ],

  time: { total: String },

  servings: {
    type: String,
    required: true
  },

  image: {
    type: String
  },

  // comments: [ Comment ]

})

module.exports = Recipe = mongoose.model('Recipe', RecipeSchema);
