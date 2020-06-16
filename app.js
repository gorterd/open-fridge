const express = require("express");
const mongoose = require('mongoose');
const passport = require('passport');
const app = express();
const db = require('./config/keys').mongoURI
const bodyParser = require('body-parser');
const users = require("./routes/api/users");
const recipes = require("./routes/api/recipes");
require('./config/passport')(passport);

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

app.use(passport.initialize());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api/users", users);
app.use("/api/recipes", recipes);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));