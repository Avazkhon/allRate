import {
  GET_COMMON_RATES_REQUEST,
  GET_COMMON_RATES_SUCCESS,
  GET_COMMON_RATES_FAIL,
} from '../constants'

const initState = {
  isFetching: false,
  data: null,
  error: null,
};

export default function rate(state = initState, action) {

  if (action.type === GET_COMMON_RATES_REQUEST) {
    return {
      ...state,
      isFetching: true,
    }
  }
  if (action.type === GET_COMMON_RATES_SUCCESS) {
    return {
      ...state,
      error: null,
      isFetching: false,
      data: action.response,
    }
  }
  if (action.type === GET_COMMON_RATES_FAIL) {
    return {
      ...state,
      data: null,
      isFetching: false,
      error: action.error,
    }
  }

  return state;
}
