import * as sessionUtil from '../util/session_api_util'

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER';
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";
export const CLEAR_ERRORS = "CLEAR_ERRORS";

export const receiveCurrentUser = (currentUser) => {
  return {
    type: RECEIVE_CURRENT_USER,
    currentUser,
  };
};

// export const logoutCurrentUser = () => {
//   return {
//     type: LOGOUT_CURRENT_USER,
//   };
// };

export const receiveErrors = (errors) => {
  return {
    type: RECEIVE_SESSION_ERRORS,
    errors,
  };
};

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};

export const login = (user) => (dispatch) => {
  return sessionUtil.login(user)
    .then((user) => dispatch(receiveCurrentUser(user)))
    .catch((err) => dispatch(receiveErrors(err.response.data)));
};

// export const logout = () => (dispatch) => {
//   return sessionUtil.logoutUser()
//     .then(() => dispatch(logoutCurrentUser()))
//     .fail((err) => dispatch(receiveErrors(err)));
// };

export const signup = (user) => (dispatch) => {
  return sessionUtil.signup(user)
    .then((user) => dispatch(receiveCurrentUser(user)))
    .catch((err) => dispatch(receiveErrors(err.response.data)));
}; 
