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

export const createRecipe = recipe => {
  debugger
  return axios.post('/api/recipes/', recipe)
}