import { OPEN_MODAL, CLOSE_MODAL } from '../actions/modal_actions';

const defaultState = {
  type: null,
  data: null
}

const modalReducer = (oldState = defaultState, action) => {
  Object.freeze(oldState);
  switch (action.type) {
    case OPEN_MODAL:
      return action.modal;
    case CLOSE_MODAL:
      return defaultState;
    default:
      return oldState;
  }
}

export default modalReducer;