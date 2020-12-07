import {
  POST_BLOCK,
} from '../constants'

import {
  createReducer,
  createRequestReducer,
} from '../utils';

const initState = {
  isFetching: false,
  error: null,
  data: {
    docs: [],
  },
};

export default createReducer(initState, {
  [POST_BLOCK]: (_state, _action) =>
  createRequestReducer(_state, _action, {
    SEND: (state) => ({
      ...state,
      isFetching: true,
    }),
    SUCCESS: (state, action) => ({
      ...state,
      error: null,
      isFetching: false,
      data: {
        ...state.data,
        docs: [
          ...state.data.docs,
          action.response
        ]
      },
    }),
    FAIL: (state, action) => ({
      ...state,
      error: action.error,
      isFetching: false,
    }),
  }),

});
