import React from "react";
import ReactDOM from "react-dom";
import jwt_decode from "jwt-decode";

import "./index.css";
import Root from "./components/root";
import configureStore from "./store/store";
import { setAuthToken } from "./util/session_api_util";
import { logout } from "./actions/session_actions";
import { pinRecipe } from './actions/recipe_actions';

// for testing purposes
import { receivePinnedRecipes } from './actions/recipe_actions';
import { fetchPinnedRecipes } from "./util/recipe_api_util";

document.addEventListener("DOMContentLoaded", () => {
  let store;

  if (localStorage.jwtToken) {
    setAuthToken(localStorage.jwtToken);

    const decodedUser = jwt_decode(localStorage.jwtToken);
    const preloadedState = {
      session: { isAuthenticated: true, user: decodedUser },
    };

    store = configureStore(preloadedState);

    const currentTime = Date.now() / 1000;

    if (decodedUser.exp < currentTime) {
      window.location.href = "/#/";
      store.dispatch(logout());
    }

    fetchPinnedRecipes(decodedUser.id).then( res => {
      debugger;
      store.dispatch(receivePinnedRecipes(res.data.map( recipe => recipe._id)));
    })
  } else {
    store = configureStore({});
  }
  const root = document.getElementById("root");
  window.dispatch = store.dispatch;
  window.pinRecipe = pinRecipe;

  ReactDOM.render(<Root store={store} />, root);
});
