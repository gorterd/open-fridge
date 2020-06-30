const express = require("express");
const router = express.Router();
const passport = require('passport');

const Comment = require("../../models/Comment")

router.post("/", passport.authenticate("jwt", { session: false }), (req, res) => {

  const newComment = new Comment({
    author: {
      _id: req.user.id,
      username: req.user.username },
    recipe: req.body.recipe,
    text: req.body.text,
    section: req.body.section
  });

  newComment.save().then((comment) => {
    res.json(comment);
  }, err => console.log('Could not create comment'));

}); 

router.delete("/:commentId", passport.authenticate("jwt", { session: false }),(req, res) => {
  Comment.findOneAndDelete({ _id: req.params.commentId }, function (err, comment) {
    if (err) {
      return res.status(400).json(err);
    } else {
      res.json(comment);
    }
  });
});


module.exports = router;
