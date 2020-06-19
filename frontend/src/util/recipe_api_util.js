import axios from "axios";

// fetch recipe given recipe objectId (ex. "5ee7fc07ba311916faf4b571")
export const fetchRecipe = recipeId => {
  return axios.get(`/api/recipes/${recipeId}`)
}

export const fetchRecipes = query => {
  return axios.get('/api/recipes', {
    params: query  
  })
}

export const fetchPinnedRecipes = userId => {
  return axios.get(`/api/users/${userId}/pins`)
}

export const fetchOwnRecipes = userId => {
  return axios.get(`/api/recipes/${userId}`)
}

export const createRecipe = recipe => {
  return axios.post('/api/recipes/', recipe)
}

export const pinRecipe = recipeId => {
  return axios.patch(`api/recipes/${recipeId}/pin`)
}

export const unpinRecipe = recipeId => {
  return axios.delete(`api/recipes/${recipeId}/pin`)
}