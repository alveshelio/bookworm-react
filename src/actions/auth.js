import { USER_LOGGED_IN, USER_LOGGED_OUT, EMAIL_CONFIRMATION_MESSAGE } from '../types';
import api from '../api';

export const userLoggedIn = user => ({
  type: USER_LOGGED_IN,
  user
});

export const userLoggedOut = () => ({
  type: USER_LOGGED_OUT
});

export const emailConfirmationMessage = message => ({
  type: EMAIL_CONFIRMATION_MESSAGE,
  message
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

// We will confirm the user email by first dispatching the call to the api passing the token
// then we take the result returned by the server and we save the token in localStorage and
// we then dispatch emailConfirmationMessage to set the message that will be displayed
// in the frontend to the user and we finally dispatch userLoggedIn passing the user so
// we can automatically login the user once he verified his email.
export const confirm = (token) => (dispatch) => api.user.confirm(token)
  .then(result => {
    localStorage.bookwormJWT = result.user.token;
    dispatch(emailConfirmationMessage(result.message));
    dispatch(userLoggedIn(result.user));
  });

export const resetPasswordRequest = ({ email }) => () => api.user.resetPasswordRequest(email);

export const validateToken = (token) => () => api.user.validateToken(token);

export const resetPassword = (data) => () => api.user.resetPassword(data);

