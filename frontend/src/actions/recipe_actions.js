import * as RecipeAPIUtil from '../util/recipe_api_util';
import { receiveErrors } from './session_actions';

export const RECEIVE_RECIPE = "RECEIVE_RECIPE";
export const RECEIVE_CURRENT_RECIPE = "RECEIVE_CURRENT_RECIPE";
export const RECEIVE_RECIPES = "RECEIVE_RECIPES";
export const RECEIVE_NEW_RECIPE_ERRORS = "RECEIVE_NEW_RECIPE_ERRORS";
export const CLEAR_RECIPE_ERRORS = "CLEAR_RECIPE_ERRORS";
export const CLEAR_RECIPES = "CLEAR_RECIPES";

export const receiveCurrentRecipe = recipe => ({
  type: RECEIVE_CURRENT_RECIPE,
  recipe
})

const receiveRecipe = data => ({
  type: RECEIVE_RECIPE,
  data
})

const receiveRecipes = recipes => ({
  type: RECEIVE_RECIPES,
  recipes
})

const receiveNewRecipeErrors = errors => ({
  type: RECEIVE_NEW_RECIPE_ERRORS,
  errors
})

export const clearRecipeErrors = () => ({
  type: CLEAR_RECIPE_ERRORS
})

export const clearRecipes = () => ({
  type: CLEAR_RECIPES,
})

export const fetchRecipe = recipeId => dispatch => {
  return RecipeAPIUtil.fetchRecipe(recipeId)
    .then(recipe => dispatch(receiveRecipe(recipe.data)), 
      err => dispatch(receiveErrors(err.response.data)));
}

export const fetchRecipes = query => dispatch => {
  return RecipeAPIUtil.fetchRecipes(query)
    .then(recipes => { 
      dispatch(receiveRecipes(recipes.data)) })
    .catch(err => dispatch(receiveErrors(err.response.data)));
}

export const fetchPinnedRecipes = (userId) => (dispatch) => {
  return RecipeAPIUtil.fetchPinnedRecipes(userId)
    .then((recipes) => {
      dispatch(receiveRecipes(recipes.data));
    })
    .catch((err) => dispatch(receiveErrors(err.response.data)));
};

export const fetchOwnRecipes = (userId) => (dispatch) => {
  // debugger
  return RecipeAPIUtil.fetchOwnRecipes(userId)
    .then((recipes) => {
      dispatch(receiveRecipes(recipes.data));
    })
    .catch((err) => dispatch(receiveErrors(err.response.data)));
};
export const createNewRecipe = recipe => dispatch => {
  return RecipeAPIUtil.createRecipe(recipe)
    .then(recipe => {
      dispatch(receiveRecipe(recipe))}) 
    .catch((err) => dispatch(receiveNewRecipeErrors(err.response.data)));
}

