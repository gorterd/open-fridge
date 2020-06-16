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

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateRecipeInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newRecipe = new Recipe({
      author: req.user.id,
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

router.get("/user/:userId", (req, res) => {
  Recipe.find({ author: req.params.userId })
    .then((recipes) => res.json(recipes))
    .catch((err) =>
      res.status(404).json({ notweetsfound: "No recipes found from that user" })
    );
}); //finds all recipes authored by the same user



router.patch('/:recipeId', passport.authenticate('jwt', { session: false }), (req, res) => {
  Recipe.findById(req.params.recipeId, function (err, recipe) {
    if (!recipe) {
      return res.status(400).json("Recipe not found");
    } else if (recipe.author != req.user.id) {
      return res.status(400).json("Permission denied, invalid credentials");
    } else {
      Recipe.findOneAndUpdate({ _id: req.params.recipeId }, req.body, function (err, recipe) {
        if (err) {
         return res.status(400).json(err);
        } else {
          res.send(recipe)
        }
      })
    }
  });
})

router.delete("/:recipeId", passport.authenticate("jwt", { session: false }),(req, res) => {
    Recipe.findById(req.params.recipeId, function (err, recipe) {
      if (!recipe) {
        return res.status(400).json("Recipe not found");
      } else if (recipe.author != req.user.id) {
        return res.status(400).json("Permission denied, invalid credentials");
      } else {
        Recipe.findOneAndDelete({ _id: req.params.recipeId }, function (err, recipe) {
            if (err) {
              return res.status(400).json(err);
            } else {
              res.send("Deleted successfully");
            }
          }
        );
      }
    });
  }
);


module.exports = router;
