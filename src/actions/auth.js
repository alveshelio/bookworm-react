import { USER_LOGGED_IN, USER_LOGGED_OUT } from '../types';
import api from '../api';

export const userLoggedIn = user => ({
  type: USER_LOGGED_IN,
  user
});

export const userLoggedOut = () => ({
  type: USER_LOGGED_OUT
});

/* *********************************************************** */
/* The tunk action is a function that returns another function */
/* *********************************************************** */
// login takes the credentials and returns a function
// that returns the user and then dispatch a Redux action passing the user
export const login = (credentials) => (dispatch) =>
  api.user.login(credentials)
    .then(user => {
      localStorage.bookwormJWT = user.token;
      dispatch(userLoggedIn(user));
    });

// We remove bookwormJTW item from local storage and the
// then we dispatch the action userLoggedOut and we do not need to pass any arguments
// the userLoggedOut action will be catch in the reducer user
export const logout = () => (dispatch) => {
  localStorage.removeItem('bookwormJWT');
  dispatch(userLoggedOut());
};

export const confirm = (token) => (dispatch) => api.user.confirm(token)
  .then(user => {
    localStorage.bookwormJWT = user.token;
    dispatch(userLoggedIn(user));
  });

