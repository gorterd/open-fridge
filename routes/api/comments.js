const express = require("express");
const router = express.Router();
const passport = require('passport');

const Comment = require("../../models/Comment")
const User = require("../../models/User")

router.post("/", passport.authenticate("jwt", { session: false }), (req, res) => {
  const newComment = new Comment({
    author: req.user.id,
    text: req.body.text,
    section: req.body.section
  });

  newComment.save().then((comment) => 
    User.findOneAndUpdate(
      { _id: req.user.id }, 
      { $addToSet: { comments: comment } }, 
      { new: true },
      function (err, user) {
        if (err) {
          return res.status(400).json(err);
        } else {
          res.json(comment);
        }
      }),
  )
}); 

router.delete("/:commentId", passport.authenticate("jwt", { session: false }),(req, res) => {
  Comment.findOneAndDelete({ _id: req.params.commentId }, function (err, recipe) {
    if (err) {
      return res.status(400).json(err);
    } else {
      res.send("Deleted successfully");
    }
  });
});


module.exports = router;
