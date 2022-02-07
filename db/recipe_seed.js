const { readFileSync } = require('fs');
const mongoose = require('mongoose');
const db = require('../config/keys').mongoURI;
const Recipe = require("../models/Recipe");

seedYummly(__dirname + '/test/recipes_01-10.json', {
  dropYummly: true
});

async function seedYummly(file, { numRecipes, dropYummly } = {}) {
  await mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  console.log("Connected to MongoDB successfully.");

  try {
    if (dropYummly) {
      await Recipe.deleteMany({ source: 'yummly' });
      console.log('Deleted existing yummly recipes.');
    }

    const fileContents = readFileSync(file);
    let recipes = JSON.parse(fileContents);

    if (numRecipes) {
      recipes = recipes.slice(0, numRecipes);
    }

    recipes.forEach(recipe => recipe.source = 'yummly');
    await Recipe.insertMany(recipes, { ordered: false });
  } finally {
    mongoose.connection.close();
  }
}