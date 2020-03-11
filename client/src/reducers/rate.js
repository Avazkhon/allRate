import {
  CREATE_NEW_RATE,
  GET_RATES,
  GET_RATE_BY_ID,
  PUT_RATE,
} from '../constants'

import {
  createReducer,
  createRequestReducer,
} from '../utils';

const initState = {
  isFetching: false,
  rateData: null,
  error: null,
  ratesData: null,
  selectRate: null,
};

export default createReducer(initState, {
  [CREATE_NEW_RATE]: (_state, _action) =>
  createRequestReducer(_state, _action, {
    SEND: (state, action) => ({
      ...state,
      isFetching: true,
    }),
    SUCCESS: (state, action) => ({
      ...state,
      error: null,
      isFetching: false,
      rateData: action.response,
    }),
    FAIL: (state, action) => ({
      ...state,
      rateData: null,
      isFetching: false,
      error: action.error,
    }),
  }),

  [GET_RATES]: (_state, _action) =>
  createRequestReducer(_state, _action, {
    SEND: (state, action) => ({
      ...state,
      isFetching: true,
    }),
    SUCCESS: (state, action) => ({
      ...state,
      error: null,
      isFetching: false,
      ratesData: action.response,
    }),
    FAIL: (state, action) => ({
      ...state,
      ratesData: null,
      isFetching: false,
      error: action.error,
    }),
  }),

  [GET_RATE_BY_ID]: (_state, _action) =>
  createRequestReducer(_state, _action, {
    SEND: (state, action) => ({
      ...state,
      isFetching: true,
    }),
    SUCCESS: (state, action) => ({
      ...state,
      isFetching: false,
      selectRate: action.response,
      error: null
    }),
    FAIL: (state, action) => ({
      ...state,
      isFetching: false,
      selectRate: null,
      error: action.error,
    }),
  }),

  [PUT_RATE]: (_state, _action) =>
  createRequestReducer(_state, _action, {
    SEND: (state, action) => ({
      ...state,
      isFetching: true,
    }),
    SUCCESS: (state, action) => ({
      ...state,
      isFetching: false,
      selectRate: action.response,
      error: null
    }),
    FAIL: (state, action) => ({
      ...state,
      isFetching: false,
      selectRate: null,
      error: action.error,
    }),
  }),
})
