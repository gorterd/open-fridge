import axios from "axios";

// fetch recipe given recipe objectId (ex. "5ee7fc07ba311916faf4b571")
export const fetchRecipe = recipeId => {
  return axios.get(`/api/recipes/${recipeId}`)
}

// need to figure out how req.query is being passed down ?????
export const fetchRecipes = query => {
  return axios.get('/')
}

