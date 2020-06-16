const express = require("express");
const router = express.Router();
const Recipe = require("../../models/Recipe");
const passport = require('passport');
const validateRecipeInput = require('../../validation/recipe');

router.get('/', (req, res) => {
  Recipe.find()
    .sort({ name: -1 })
    .then(recipes => res.json(recipes))
    .catch(err => res.status(404).json({ norecipesfound: 'No recipes found' }));
});

router.get('/:recipeId', (req, res) => {
  Recipe.findById(req.params.recipeId)
    .then(recipe => res.json(recipe))
    .catch(err =>
      res.status(404).json({ norecipefound: 'No recipe found with that ID' })
    );
});

// router.patch('/:recipeId', (req, res) => {
//   Recipe.findById(req.params.recipeId, function(err, recipe) {
//     if (!recipe) {
//       return next(new Error('Recipe not found'))
//     } else {
      // var updateRecipe = req.body;
      // var id = req.params.recipeId;
      // db.recipe.update({ _id: ObjectId(id) }, { $set: updateRecipe });
//       db.recipe.save().then((recipe) => res.json(recipe));
//     }
//   })
//     // .then(recipe => res.json(recipe))
//     // .catch(err =>
//     //   res.status(404).json({ norecipefound: 'No recipe found with that ID' })
//     // );
//     newRecipe.save().then((recipe) => res.json(recipe));
// });
// router.patch('/:recipeId', (req, res) => {
//   recipe = Recipe.findById(req.params.recipeId, function(errors, recipe) {
//     if (!recipe) {
//       return res.status(400).json(errors);
//     } else {
//       return recipe;
//     }})
//   var updateRecipe = req.body;
//   var id = req.params.recipeId;
//   recipe.update({ _id: ObjectId(id) }, { $set: updateRecipe });
// });

router.patch('/:recipeId', (req, res) => {
  Recipe.findOneAndUpdate({ _id: req.params.recipeId }, req.body, function (err, recipe) {
    if (!recipe) {
      return res.status(400).json("Recipe not found");
    } else {
        res.send(recipe)
        // res.json(recipe);
    }})
});

router.post('/new',
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
