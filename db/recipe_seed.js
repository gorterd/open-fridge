const fs = require('fs');
const mongoose = require('mongoose');
const db = require('../config/keys').mongoURI
const Recipe = require("../models/Recipe");

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

seedYummly('./recipes/recipes_01-15.json', null, true)

async function seedYummly(file, numRecipes, drop = false){

  await dropYummly(drop).then( () => {
    fs.readFile(file, (err, data)=> {
      if (err){
        console.log(err)
      } else {
        let recipes = JSON.parse(data);
        numRecipes = numRecipes || recipes.length;
        
        for(let i = 0; i < numRecipes; i++){
          let recipe = processRecipe(recipes[i]);
          let newRecipe = new Recipe({...recipe});
          newRecipe.save()
            .then( () => {
              if (i + 1 === numRecipes){
                mongoose.connection.close();
              }
            }, err => console.log(err));
        }
      }
    });
  });
}

function processRecipe(recipe){
  recipe.source = 'yummly';
  return recipe;
}

async function dropYummly(bool) {
  if (bool) {
    await Recipe.deleteMany({ source: 'yummly' });
    // await Recipe.deleteMany({ });
  } else {
    return null;
  }
}
