const express = require("express");
const router = express.Router();
const Recipe = require("../../models/Recipe");
const passport = require('passport');
const validateRecipeInput = require('../../validation/recipe');

router.get('/:id', (req, res) => {

})

// router.post('/', 
//   passport.authenticate('jwt', { session: false }),
//   (req, res) => {
//     Recipe.makerecipe;
//   }
// )

module.exports = router;
