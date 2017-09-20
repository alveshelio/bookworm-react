import { EMAIL_CONFIRMATION_MESSAGE, USER_LOGGED_IN, USER_LOGGED_OUT } from '../types';

export default function user(state = {}, action = {}) {
  switch(action.type) {
    case EMAIL_CONFIRMATION_MESSAGE:
      return { ...state, message: action.message };
    case USER_LOGGED_IN:
      return action.user;
    case USER_LOGGED_OUT:
      // Here we have an empty object so there will be no token in user object
      return {};
    default:
      return state;
  }
}
