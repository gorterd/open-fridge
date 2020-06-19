import * as RecipeAPIUtil from '../util/recipe_api_util';
import { receiveErrors } from './session_actions';
import baconPie from '../bacon-pie.jpeg'

export const RECEIVE_RECIPE = "RECEIVE_RECIPE";
export const RECEIVE_CURRENT_RECIPE = "RECEIVE_CURRENT_RECIPE";
export const RECEIVE_RECIPES = "RECEIVE_RECIPES";
export const RECEIVE_NEW_RECIPE_ERRORS = "RECEIVE_NEW_RECIPE_ERRORS";
export const CLEAR_RECIPE_ERRORS = "CLEAR_RECIPE_ERRORS";
export const CLEAR_RECIPES = "CLEAR_RECIPES";

export const RECEIVE_PINNED_RECIPES = "RECEIVE_PINNED_RECIPES";
export const RECEIVE_PINNED_RECIPE = "RECEIVE_PINNED_RECIPE";
export const REMOVE_PINNED_RECIPE = "REMOVE_PINNED_RECIPE";

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

export const receivePinnedRecipes = recipes => ({
  type: RECEIVE_PINNED_RECIPES,
  recipes
})

const receivePinnedRecipe = recipeId => ({
  type: RECEIVE_PINNED_RECIPE,
  recipeId
})

const removePinnedRecipe = recipeId => ({
  type: REMOVE_PINNED_RECIPE,
  recipeId
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
    .then(recipe => verifyRecipePhoto(recipe.data))
    .then(recipe => {
      recipe.recipe.authorUsername = recipe.authorUsername;
      dispatch(receiveRecipe(recipe));
    }, 
      err => dispatch(receiveErrors(err.response.data)));
}

export const fetchRecipes = query => dispatch => {
  return RecipeAPIUtil.fetchRecipes(query)
    .then(recipes => verifyAllRecipePhotos(recipes.data))
    .then(recipes => { 
      dispatch(receiveRecipes(recipes)) })
    .catch(err => dispatch(receiveErrors(err.response.data)));
}

export const fetchPinnedRecipes = (userId) => (dispatch) => {
  return RecipeAPIUtil.fetchPinnedRecipes(userId)
    .then(recipes => verifyAllRecipePhotos(recipes.data))
    .then((recipes) => {
      dispatch(receivePinnedRecipes(recipes.map( r => r._id)))
      dispatch(receiveRecipes(recipes));
    })
    .catch((err) => dispatch(receiveErrors(err.response.data)));
};

export const fetchOwnRecipes = (userId) => (dispatch) => {
  return RecipeAPIUtil.fetchOwnRecipes(userId)
    .then(recipes => verifyAllRecipePhotos(recipes.data))
    .then((recipes) => {
      dispatch(receiveRecipes(recipes));
    })
    .catch((err) => dispatch(receiveErrors(err.response.data)));
};

export const createNewRecipe = recipe => dispatch => {
  return RecipeAPIUtil.createRecipe(recipe)
    .then(recipe => verifyRecipePhoto(recipe.data))
    .then(recipe => {
      dispatch(receiveRecipe(recipe))}) 
    .catch((err) => dispatch(receiveNewRecipeErrors(err.response.data)));
}

export const pinRecipe = recipeId => dispatch => {
  return RecipeAPIUtil.pinRecipe(recipeId)
    .then(recipe => {
      dispatch(receivePinnedRecipe(recipe.data._id))
    })
}

export const unpinRecipe = recipeId => dispatch => {
  return RecipeAPIUtil.unpinRecipe(recipeId)
    .then(recipe => dispatch(removePinnedRecipe(recipe.data._id)))
}

async function verifyRecipePhoto(data) {
  return verifyPhoto(data.recipe.image)
      .then( newUrl => data.recipe.image = newUrl )
      .then( () => data );
}

async function verifyAllRecipePhotos(recipes) {
  let verifyPromises = recipes.map( recipe => {
    return verifyPhoto(recipe.image)
      .then( newUrl => recipe.image = newUrl );
  })

  return Promise.all(verifyPromises).then( () => recipes);
}

async function verifyPhoto(url){
  if (!url) { return baconPie };
  
  const img = new Image();

  const checkDimensions = new Promise( (resolve, reject) => {
    img.onload = () => {
      resolve( img.height > 10 && img.width > 10);
    }
    img.onerror = () => reject();
    img.src = url;
  })

  let isValid = await checkDimensions;
  
  return isValid ? url : baconPie;
}

