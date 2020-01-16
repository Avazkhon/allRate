import {
  AUTH_REGISTRATION,
} from '../constants'

const initState = {};

export default function registration(state = initState, action) {
  if (action.type === 'AUTH_REGISTRATION') {
    return {
      ...state,
      action
    }
  }
  return state;
}
