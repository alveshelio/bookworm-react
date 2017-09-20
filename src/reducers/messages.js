import { EMAIL_CONFIRMATION_MESSAGE } from '../types';

export default function user(state = {}, action = {}) {
  switch(action.type) {
    case EMAIL_CONFIRMATION_MESSAGE:
      console.log('EMAIL_CONFIRMATION_MESSAGE', action.message);
      return action.message;
    default:
      return state;
  }
}
