import {
  GET_PURSE,
} from '../constants'

import {
  createReducer,
  createRequestReducer,
} from '../utils';

const initState = {
  isFetching: false,
  purse: null,
  error: null,
};

export default createReducer(initState, {
  [GET_PURSE]: (_state, _action) =>
  createRequestReducer(_state, _action, {
    SEND: (state, action) => ({
      ...state,
      isFetching: true,
    }),
    SUCCESS: (state, action) => ({
      ...state,
      error: null,
      isFetching: false,
      purse: action.response,
    }),
    FAIL: (state, action) => ({
      ...state,
      purse: null,
      isFetching: false,
      error: action.error,
    }),
  }),

})
