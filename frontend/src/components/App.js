import React from "react";
// import { AuthRoute, ProtectedRoute } from "../util/route_util";
import { Switch, Route, } from "react-router-dom";

import Modal from './modal/modal';
import SplashContainer from './splash/splash_container';
import LoginFormContainer from "./session/login_container";
import SignupFormContainer from "./session/signup_container";
<<<<<<< HEAD
import RecipeCreate from "./recipe/recipe_create"
=======
import RecipeShowContainer from "./recipe/recipe_show_container";
>>>>>>> master

const App = () => (
  <div>
    <Modal />
<<<<<<< HEAD
    {/* <NavBarContainer /> */}
=======
>>>>>>> master
    <Switch>

      <Route exact path="/" component={SplashContainer} />
      {/* <AuthRoute exact path="/" component={SplashContainer} /> */}
      <Route exact path="/login" component={LoginFormContainer} />  {/* NEED TO CHANGE TO AUTH ROUTES */}
<<<<<<< HEAD
      <Route exact path="/signup" component={SignupFormContainer} />
      <Route exact path="/new-recipe" component={RecipeCreate} />
=======
      <Route exact path="/signup" component={SignupFormContainer} /> 
      <Route exact path="/recipes/:recipeId" component={RecipeShowContainer} /> 
>>>>>>> master
    </Switch>
  </div>
);

export default App;
