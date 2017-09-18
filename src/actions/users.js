import { userLoggedIn } from './auth';
import api from '../api';

/*
* Once the user has signed up, we will automatically login the user
* that's why after we dispatch the action to signup the user, we
* dispatch another action to login user
* */

export const signup = (data) =>
  (dispatch) => api.user.signup(data)
    .then(user => dispatch(userLoggedIn(user)));
