const express = require("express");
const router = express.Router();
const passport = require('passport');
const ingParser = require('ingredientparser');
const validateRecipeInput = require('../../validation/recipe');
const FilterResults = require('../../util/filter_results');

const Recipe = require("../../models/Recipe");
const User = require("../../models/User");
const Comment = require("../../models/Comment");

// available query string params:
  // ingredients: comma-separated list of ingredients recipes should include
  // skip: buffer / offset, how far into the results to start (for fetching
  //    more results, such as for infinite scroll ); default 0
  // num: how many results to fetch; default 20
  // verbose: if ANY value is given here, will include instructions & 
  //    ingredients, otherwise won't

router.get('/', (req, res) => {
  let results = Recipe.aggregate();
  let { ingredients, skip, num, include } = req.query;
  
  results = new FilterResults(results)
    .byIngredients(ingredients)
    .with(include)
    .complete();

  results
    .skip(parseInt(skip) || 0)
    .limit(parseInt(num) || 20)
    .then(recipes => res.json(recipes))
    .catch(err => {
      res.status(404).json({ norecipesfound: 'No recipes found' })
    });      
});

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateRecipeInput(req.body);
    
    console.log(req.body)

    if (!isValid) {
      return res.status(400).json(errors);
    }

    let ingredients = ( typeof req.body.ingredients[0] === 'string' ) ?
      req.body.ingredients.map( ing => Object.assign(ingParser.parse(ing), { fullName: ing }) )
      : req.body.ingredients; 

    let time = ( typeof req.body.time === 'string' ) ?
      { total: req.body.time } : req.body.time; 

    const newRecipe = new Recipe({
      author: req.user.id,
      name: req.body.name,
      servings: req.body.servings,
      instructions: req.body.instructions,
      image: req.body.image,
      source: 'user',
      ingredients,
      time,
    });

    newRecipe.save().then((recipe) => res.json(recipe));
  }
);

router.patch(
  "/:recipeId/pin",
  passport.authenticate("jwt", { session: false }), (req, res) => {
    Recipe.findById(req.params.recipeId, function (err, recipe) {
      User.findOneAndUpdate(
        { _id: req.user.id }, 
        { $addToSet: { pinnedRecipes: recipe } }, 
        function (err, user) {
          if (err) {
            return res.status(400).json(err);
          } else {
            res.json("Pinned successfully");
          }
        }
      );
    })
  }
); //pinning a recipe

router.delete(
  "/:recipeId/pin", passport.authenticate("jwt", { session: false }), (req, res) => {
    Recipe.findById(req.params.recipeId, function (err, recipe) {
      User.findOneAndUpdate(
        { _id: req.user.id }, 
        { $pull: { pinnedRecipes: recipe } }, 
        function (err, user) {
          if (err) {
            return res.status(400).json(err);
          } else {
            res.json("Unpinned successfully");
          }
        }
      );
    })
  }
); //unpinning a recipe

router.get('/:recipeId', (req, res) => {
  Recipe.findById(req.params.recipeId)
    .then(recipe => {
      Comment.find({ recipe: recipe._id }).then( comments => {
        res.json({recipe, comments});
      })
    })
    .catch(err =>
      res.status(404).json({ norecipefound: 'No recipe found with that ID' })
    );
});

router.get("/user/:userId", (req, res) => {
  Recipe.find({ author: req.params.userId })
    .then((recipes) => res.json(recipes))
    .catch((err) =>
      res.status(404).json({ norecipesfound: "No recipes found from that user" })
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
