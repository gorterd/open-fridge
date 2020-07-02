import React from "react";
import { Switch, Route } from "react-router-dom";
import { AuthRoute, ProtectedRoute } from "../util/route_util";

import Modal from './modal/modal';
import SplashContainer from './splash/splash_container';
import LoginFormContainer from "./session/login_container";
import SignupFormContainer from "./session/signup_container";
import RecipeCreateContainer from "./recipe/rcp_create/recipe_create_container";
import RecipeShowContainer from "./recipe/rcp_show/recipe_show_container";
import ProfileShowContainer from './profile/profile_show_container';

const App = () => (
  <div>
    <Modal />
    <Switch>
      <Route exact path="/" component={SplashContainer} />
      <Route exact path="/recipes/:recipeId" component={RecipeShowContainer} /> 
      
      <AuthRoute exact path="/login" component={LoginFormContainer} />
      <AuthRoute exact path="/signup" component={SignupFormContainer} /> 
      <ProtectedRoute exact path="/new-recipe" component={RecipeCreateContainer} />
      <ProtectedRoute exact path="/users/:userId" component={ProfileShowContainer} />
    </Switch>
  </div>
);

export default App;
