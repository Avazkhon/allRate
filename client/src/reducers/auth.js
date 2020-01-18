import {
  AUTH_REGISTRATION,
  AUTH_LOGIN,
} from '../constants'

const initState = {
  isFetching: false,
  data: null,
  error: null,
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
        isFetching: true,
      }
    }
    if (action.status === 'SUCCESS') {
      return {
        ...state,
        data: {
          ...state.data,
          ...action.response.data,
        },
        isFetching: false,
      }
    }

    if (action.status === 'FAIL') {
      return {
        ...state,
        isFetching: false,
        error: action.message,
      }
    }
  }
  return state;
}
