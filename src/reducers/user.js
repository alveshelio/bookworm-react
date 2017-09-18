import { USER_LOGGED_IN, USER_LOGGED_OUT } from '../types';

export default function user(state = {}, action = {}) {
  switch(action.type) {
    case USER_LOGGED_IN:
      return action.user;
    case USER_LOGGED_OUT:
      // Here we have an empty object so there will be no token in user object
      return {};
    default:
      return state;
  }
}
