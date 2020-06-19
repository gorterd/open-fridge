import {
  RECEIVE_CURRENT_USER, 
  LOGOUT_CURRENT_USER } from '../actions/session_actions';

import { RECEIVE_PINNED_RECIPE, RECEIVE_PINNED_RECIPES, REMOVE_PINNED_RECIPE } from '../actions/recipe_actions'

const _nullSession = { 
  isAuthenticated: false, 
  user: null,
  pinnedRecipes: []
}

const sessionReducer = (state = _nullSession, action) => {
  Object.freeze(state);
  let newPins;
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return Object.assign({}, state, { isAuthenticated: true, user: action.currentUser });
    case LOGOUT_CURRENT_USER:
      return _nullSession;
    case RECEIVE_PINNED_RECIPES:
      return Object.assign({}, state, {pinnedRecipes: action.recipes})
    case RECEIVE_PINNED_RECIPE:
      newPins = Array.from(state.pinnedRecipes)
      if (!newPins.includes(action.recipeId)) { newPins.push(action.recipeId)}
      return Object.assign({}, state, {pinnedRecipes: newPins})
    case REMOVE_PINNED_RECIPE:
        newPins = Array.from(state.pinnedRecipes)
        if (newPins.includes(action.recipeId)) { 
          newPins.splice(newPins.indexOf(action.recipeId), 1);
        }
        return Object.assign({}, state, {pinnedRecipes: newPins})
    default:
      return state;
  }
}

export default sessionReducer;