import { combineReducers } from 'redux';

import entitiesReducer from "./entity_reducers/entities_reducer";
import errorsReducer from './error_reducers/errors_reducer';
import uiReducer from './ui_reducer';
import sessionReducer from './session_reducer';

const rootReducer = combineReducers({
  entities: entitiesReducer,
  errors: errorsReducer,
  ui: uiReducer,
  session: sessionReducer
})

export default rootReducer;