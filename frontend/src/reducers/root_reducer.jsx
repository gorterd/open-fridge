import { combineReducers } from 'redux';

import uiReducer from './ui_reducer';
import errorsReducer from './errors_reducer';

const rootReducer = combineReducers({
  errors: errorsReducer,
  ui: uiReducer,
})

export default rootReducer;