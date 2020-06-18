import { RECEIVE_RECIPE } from '../actions/recipe_actions';
import { RECEIVE_COMMENT, REMOVE_COMMENT } from '../actions/comment_actions';

const commentsReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_RECIPE:
      if (action.data.comments){
        let normalizedComments = {};
        action.data.comments.forEach( comment => 
          ( normalizedComments[comment._id] = comment ));
        return Object.assign({}, state, normalizedComments);
      } else {
        return state;
      }
    case RECEIVE_COMMENT:
      return Object.assign({}, state, { [action.comment._id]: action.comment });
    case REMOVE_COMMENT:
      let newState = Object.assign({}, state);
      delete newState[action.comment._id]
      return newState;
    default:
      return state;
  }
}

export default commentsReducer;