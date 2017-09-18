import { USER_LOGGED_IN } from '../types';

export default function user(state = {}, action = {}) {
  console.log('action', action);
  switch(action.type) {
    case USER_LOGGED_IN:
      console.log('action.user', action.user);
      return action.user;
    default:
      return state;
  }
}
