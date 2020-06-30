import { RECEIVE_RECIPE, RECEIVE_RECIPES, CLEAR_RECIPES } from '../../actions/recipe_actions';
import { RECEIVE_COMMENT, REMOVE_COMMENT } from '../../actions/comment_actions';

const recipesReducer = (state = {}, action) => {
  Object.freeze(state);
  let recipe, comments;
  switch(action.type) {

    case RECEIVE_RECIPE:
      comments = action.data.comments ? (
        action.data.comments.map( comment => comment._id )
        ) : [];
      recipe = Object.assign({}, action.data.recipe, { comments });

      return Object.assign({}, state, { [recipe._id]: recipe });

    case RECEIVE_RECIPES:
      let normalizedRecipes = {};
      action.recipes.forEach(recipe =>
        (normalizedRecipes[recipe._id] = recipe));
      return Object.assign({}, state, normalizedRecipes);

    case CLEAR_RECIPES:
      return {};

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

