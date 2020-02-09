import {
  CREATE_NEW_RATE_REQUEST,
  CREATE_NEW_RATE_SUCCESS,
  CREATE_NEW_RATE_FAIL,
} from '../constants'

const initState = {
  isFetching: false,
  rateData: null,
  error: null,
};

export default function rate(state = initState, action) {

  if (action.type === CREATE_NEW_RATE_REQUEST) {
    return {
      ...state,
      isFetching: true,
    }
  }
  if (action.type === CREATE_NEW_RATE_SUCCESS) {
    return {
      error: null,
      isFetching: false,
      rateData: action.response,
    }
  }
  if (action.type === CREATE_NEW_RATE_FAIL) {
    return {
      rateData: null,
      isFetching: false,
      error: action.error,
    }
  }

  return state;
}
