import {
  CREATE_NEW_RATE_REQUEST,
  CREATE_NEW_RATE_SUCCESS,
  CREATE_NEW_RATE_FAIL,

  GET_RATES_REQUEST,
  GET_RATES_SUCCESS,
  GET_RATES_FAIL,

  GET_RATE_BY_ID_REQUEST,
  GET_RATE_BY_ID_SUCCESS,
  GET_RATE_BY_ID_FAIL,

  PUT_RATE_REQUEST,
  PUT_RATE_SUCCESS,
  PUT_RATE_FAIL,
} from '../constants'

const initState = {
  isFetching: false,
  rateData: null,
  error: null,
  ratesData: null,
  selectRate: null,
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
      ...state,
      error: null,
      isFetching: false,
      rateData: action.response,
    }
  }
  if (action.type === CREATE_NEW_RATE_FAIL) {
    return {
      ...state,
      rateData: null,
      isFetching: false,
      error: action.error,
    }
  }


  if (action.type === GET_RATES_REQUEST) {
    return {
      ...state,
      isFetching: true,
    }
  }
  if (action.type === GET_RATES_SUCCESS) {
    return {
      ...state,
      error: null,
      isFetching: false,
      ratesData: action.response,
    }
  }
  if (action.type === GET_RATES_FAIL) {
    return {
      ...state,
      ratesData: null,
      isFetching: false,
      error: action.error,
    }
  }


  if (action.type === GET_RATE_BY_ID_REQUEST) {
    return {
      ...state,
      isFetching: true,
    }
  }
  if (action.type === GET_RATE_BY_ID_SUCCESS) {
    return {
      ...state,
      isFetching: false,
      selectRate: action.response,
      error: null
    }
  }
  if (action.type === GET_RATE_BY_ID_FAIL) {
    return {
      ...state,
      isFetching: false,
      selectRate: null,
      error: action.error,
    }
  }

  if (action.type === PUT_RATE_REQUEST) {
    return {
      ...state,
      isFetching: true,
    }
  }
  if (action.type === PUT_RATE_SUCCESS) {
    return {
      ...state,
      isFetching: false,
      selectRate: action.response,
      error: null
    }
  }
  if (action.type === PUT_RATE_FAIL) {
    return {
      ...state,
      isFetching: false,
      selectRate: null,
      error: action.error,
    }
  }

  return state;
}
