import {
  GET_POST_BY_ID,
} from '../constants';

import {
  createReducer,
  createRequestReducer,
} from '../utils';

const initState = {
  isFetching: false,
  data: {},
  error: null,
};

export default createReducer(initState, {

  [GET_POST_BY_ID]: (_state, _action) =>
  createRequestReducer(_state, _action, {
    SEND: (state) => ({
      ...state,
      isFetching: true,
    }),
    SUCCESS: (state, action) => ({
      ...state,
      error: null,
      isFetching: false,
      data: action.response,
    }),
    FAIL: (state, action) => ({
      ...state,
      error: action.error,
      isFetching: false,
    }),
  }),
})
