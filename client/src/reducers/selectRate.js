import {
  CREATE_NEW_RATE,
  GET_RATE_BY_ID,
  PUT_RATE,
  PUT_RATE_LIVE,
  PUT_RATE_SELECT_VICTORY,
} from '../constants'

import {
  createReducer,
  createRequestReducer,
} from '../utils';

const initState = {
  isFetching: false,
  data: null,
  error: null,
};

function selectRateReduc () {
  return {
    SEND: (state, action) => ({
      ...state,
      isFetching: true,
    }),
    SUCCESS: (state, action) => ({
      ...state,
      isFetching: false,
      data: action.response,
      error: null
    }),
    FAIL: (state, action) => ({
      ...state,
      isFetching: false,
      data: null,
      error: action.error,
    }),
  }
}

export default createReducer(initState, {
  [CREATE_NEW_RATE]: (_state, _action) =>
  createRequestReducer(_state, _action, selectRateReduc()),

  [GET_RATE_BY_ID]: (_state, _action) =>
  createRequestReducer(_state, _action, selectRateReduc()),

  [PUT_RATE]: (_state, _action) =>
  createRequestReducer(_state, _action, selectRateReduc()),

  [PUT_RATE_LIVE]: (_state, _action) =>
  createRequestReducer(_state, _action, selectRateReduc()),

  [PUT_RATE_SELECT_VICTORY]: (_state, _action) =>
  createRequestReducer(_state, _action, selectRateReduc()),
})
