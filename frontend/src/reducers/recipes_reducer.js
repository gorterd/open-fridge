import { RECEIVE_RECIPE, RECEIVE_RECIPES } from '../actions/recipe_actions';

const recipesReducer = (state = {}, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_RECIPE:
      return Object.assign({}, state, { [action.recipe._id]: action.recipe });
    case RECEIVE_RECIPES:
      return Object.assign({}, state, action.recipes);
    default:
      return state;
  }
}

export default recipesReducer;