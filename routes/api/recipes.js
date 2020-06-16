const express = require("express");
const router = express.Router();
const Recipe = require("../../models/Recipe");
const passport = require('passport');
const validateRecipeInput = require('../../validation/recipe');
const FilterResults = require('../../util/filter_results');

router.get('/', (req, res) => {
  let results = Recipe.aggregate();
  let { ingredients, skip, num, verbose } = req.query;
  
  results = new FilterResults(results)
    .byIngredients(ingredients)
    .complete();

  if (!verbose){
    results.append({ $unset: ['instructions', 'ingredients']})
  }
  
  results
    .skip(parseInt(skip) || 0)
    .limit(parseInt(num) || 20)
    .then(recipes => res.json(recipes))
    .catch( err => {
      console.log(err)
      res.status(404).json({ norecipesfound: 'No recipes found' })
    });      
});

router.get('/:id', (req, res) => {
  Recipe.findById(req.params.id)
    .then(recipe => res.json(recipe))
    .catch(err =>
      res.status(404).json({ norecipefound: 'No recipe found with that ID' })
    );
});

router.post('/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateRecipeInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newRecipe = new Recipe({
      name: req.body.name,
      servings: req.body.servings,
      ingredients: req.body.ingredients,
      instructions: req.body.instructions,
      time: req.body.time
    });

    newRecipe.save().then(recipe => res.json(recipe));
  }
);

module.exports = router;
