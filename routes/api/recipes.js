const express = require("express");
const router = express.Router();
const Recipe = require("../../models/Recipe");
const passport = require('passport');
const validateRecipeInput = require('../../validation/recipe');
const FilterResults = require('../../util/filter_results');

// available query string params:
  // ingredients: comma-separated list of ingredients recipes should include
  // skip: buffer / offset, how far into the results to start (for fetching
  //    more results, such as for infinite scroll ); default 0
  // num: how many results to fetch; default 20
  // verbose: if ANY value is given here, will include instructions & 
  //    ingredients, otherwise won't

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

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
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
      time: req.body.time,
    });

    newRecipe.save().then((recipe) => res.json(recipe));
  }
);

router.get('/:recipeId', (req, res) => {
  Recipe.findById(req.params.recipeId)
    .then(recipe => res.json(recipe))
    .catch(err =>
      res.status(404).json({ norecipefound: 'No recipe found with that ID' })
    );
});

router.patch('/:recipeId', passport.authenticate('jwt', { session: false }), (req, res) => {
  Recipe.findOneAndUpdate({ _id: req.params.recipeId }, req.body, function (err, recipe) {
    if (!recipe) {
      return res.status(400).json("Recipe not found");
    } else {
        res.send(recipe)
    }})
});

router.delete('/:recipeId', passport.authenticate('jwt', { session: false }), (req, res) => {
  Recipe.findOneAndDelete({ _id: req.params.recipeId }, req.body, function (err, recipe) {
    if (!recipe) {
      return res.status(400).json("Recipe not found");
    } else {
      res.status(204).send("Recipe successfully removed");
    }
  });
});


module.exports = router;
