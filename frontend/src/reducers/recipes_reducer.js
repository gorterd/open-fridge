import { RECEIVE_RECIPE, RECEIVE_RECIPES } from '../actions/recipe_actions';
import { RECEIVE_COMMENT, REMOVE_COMMENT } from '../actions/comment_actions';

const recipesReducer = (state = {}, action) => {
  Object.freeze(state);
  let recipe, comments;
  switch(action.type) {
    case RECEIVE_RECIPE:
      comments = action.recipe.comments ? (
        action.recipe.comments.map( comment => comment._id )
        ) : null;
      recipe = Object.assign({}, action.recipe, { comments });

      return Object.assign({}, state, { [recipe._id]: recipe });
    case RECEIVE_RECIPES:
      return Object.assign({}, state, action.recipes);
    case RECEIVE_COMMENT:
      comments = [...state[action.comment.recipe].comments, action.comment._id];
      recipe = Object.assign({}, state[action.comment.recipe], { comments });

      return Object.assign({}, state, { [recipe._id]: recipe });
    case REMOVE_COMMENT:
      comments = Array.from(state[action.comment.recipe].comments)
      comments.splice( comments.indexOf(action.comment._id), 1);
      recipe = Object.assign({}, state[action.comment.recipe], { comments });

      return Object.assign({}, state, { [recipe._id]: recipe });
    default:
      return state;
  }
}

export default recipesReducer;

