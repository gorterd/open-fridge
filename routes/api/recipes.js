const express = require("express");
const router = express.Router();
const Recipe = require("../../models/Recipe");
const passport = require('passport');
const validateRecipeInput = require('../../validation/recipe');

router.get('/', (req, res) => {
  Recipe.find()
    .sort({ date: -1 })
    .then(recipes => res.json(recipes))
    .catch(err => res.status(404).json({ norecipesfound: 'No recipes found' }));
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
      text: req.body.text,
      user: req.user.id
    });

    newRecipe.save().then(recipe => res.json(recipe));
  }
);


module.exports = router;
