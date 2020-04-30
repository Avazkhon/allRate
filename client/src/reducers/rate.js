import {
  GET_RATES,
} from '../constants'

import {
  createReducer,
  createRequestReducer,
} from '../utils';

const initState = {
  isFetching: false,
  error: null,
  ratesData: null,
};

export default createReducer(initState, {
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
})
