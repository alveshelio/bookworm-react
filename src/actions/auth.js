import { USER_LOGGED_IN } from '../types';
import api from '../api';

export const userLoggedIn = user => ({
  type: USER_LOGGED_IN,
  user
});

// login takes the credentials and returns a function
// that returns the user and then dispatch a Redux action passing the user
export const login = (credentials) => (dispatch) =>
  api.user.login(credentials).then(user => dispatch(userLoggedIn(user)));
