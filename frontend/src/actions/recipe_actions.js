import * as RecipeAPIUtil from '../util/recipe_api_util';
import { receiveErrors } from './session_actions';

export const RECEIVE_RECIPE = "RECEIVE_RECIPE";
export const RECEIVE_CURRENT_RECIPE = "RECEIVE_CURRENT_RECIPE";
export const RECEIVE_RECIPES = "RECEIVE_RECIPES";
export const CLEAR_RECIPES = "CLEAR_RECIPES";

export const receiveCurrentRecipe = recipe => ({
  type: RECEIVE_CURRENT_RECIPE,
  recipe
})

const receiveRecipe = recipe => ({
  type: RECEIVE_RECIPE,
  recipe
})

const receiveRecipes = recipes => ({
  type: RECEIVE_RECIPES,
  recipes
})

export const clearRecipes = () => ({
  type: CLEAR_RECIPES,
})

export const fetchRecipe = recipeId => dispatch => {
  return RecipeAPIUtil.fetchRecipe(recipeId)
    .then(recipe => dispatch(receiveRecipe(recipe.data)))
    .catch(err => dispatch(receiveErrors(err.response.data)));
}

export const fetchRecipes = query => dispatch => {
  return RecipeAPIUtil.fetchRecipes(query)
    .then(recipes => { 
      dispatch(receiveRecipes(recipes.data)) })
    .catch(err => dispatch(receiveErrors(err.response.data)));
}

