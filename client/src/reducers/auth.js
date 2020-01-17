import {
  AUTH_REGISTRATION,
  AUTH_LOGIN,
} from '../constants'

const initState = {
  auth: {
    isFetching: false,
    data: null,
    error: null,
  },
};

export default function auth(state = initState, action) {
  if (action.type === AUTH_REGISTRATION) {
    return {
      ...state,
      action
    }
  }

  if (action.type === AUTH_LOGIN) {
    if (action.status === 'SEND') {
      return {
        ...state,
        auth: {
          ...state.auth,
          isFetching: true,
        }
      }
    }
    if (action.status === 'SUCCESS') {
      return {
        ...state,
        auth: {
          ...state.auth,
          data: action.data,
          isFetching: false,
        }
      }
    }

    if (action.status === 'FAIL') {
      return {
        ...state,
        auth: {
          ...state.auth,
          isFetching: false,
          error: action.message,
        }
      }
    }
  }
  return state;
}
