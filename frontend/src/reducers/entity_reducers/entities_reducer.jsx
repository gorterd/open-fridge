import { combineReducers } from "redux";

import recipesReducer from './recipes_reducer';
import commentsReducer from './comments_reducer';

const entitiesReducer = combineReducers({
  recipes: recipesReducer,
  comments: commentsReducer,
})

export default entitiesReducer;