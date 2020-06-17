import { RECEIVE_RECIPE } from '../actions/recipe_actions';

const recipesReducer = (state = {}, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_RECIPE:
      return Object.assign({}, state, { [action.recipe._id]: action.recipe });
    default:
      return state;
  }
}

export default recipesReducer;