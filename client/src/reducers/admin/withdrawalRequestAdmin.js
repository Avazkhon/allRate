import {
  GET_WITHDRAWALR_REQUEST_ADMIN,
  PATCH_WITHDRAWALR_REQUEST_ADMIN,
} from '../../constants'

import {
  createReducer,
  createRequestReducer,
} from '../../utils';

const initState = {
  isFetching: false,
  data: {
    docs: [],
    withdrawalRequest: {},
  },
  error: null,
};

export default createReducer(initState, {
  [GET_WITHDRAWALR_REQUEST_ADMIN]: (_state, _action) =>
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
        ...action.response,
      }
    }),
    FAIL: (state, action) => ({
      ...state,
      isFetching: false,
      error: action.error,
    }),
  }),

  [PATCH_WITHDRAWALR_REQUEST_ADMIN]: (_state, _action) =>
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
        docs: state.data.docs.map((elm) => {
          if (elm._id === action.response._id) {
            return action.response;
          }
          return elm;
        })
      }
    }),
    FAIL: (state, action) => ({
      ...state,
      isFetching: false,
      error: action.error,
    }),
  }),

})
