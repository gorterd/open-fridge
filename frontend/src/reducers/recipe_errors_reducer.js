import { 
  RECEIVE_NEW_RECIPE_ERRORS, 
  CLEAR_RECIPE_ERRORS, 
  RECEIVE_CURRENT_RECIPE 
} from '../actions/recipe_actions'


const recipeErrorsReducer = (oldState = {}, action) => {
  Object.freeze(oldState);

  switch (action.type) {
    case RECEIVE_NEW_RECIPE_ERRORS:
      return action.errors;
    case RECEIVE_CURRENT_RECIPE:
      return {};
    case CLEAR_RECIPE_ERRORS:
      return {};
    default:
      return oldState;
  }
}

export default recipeErrorsReducer;