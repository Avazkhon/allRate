import {
  GET_WITHDRAWALR_REQUEST,
  POST_WITHDRAWALR_REQUEST,
  PATCH_WITHDRAWALR_REQUEST,
} from '../constants'

import {
  createReducer,
  createRequestReducer,
} from '../utils';

const initState = {
  isFetching: false,
  data: {
    docs: [],
    withdrawalRequest: {},
  },
  error: null,
};

export default createReducer(initState, {
  [GET_WITHDRAWALR_REQUEST]: (_state, _action) =>
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

  [POST_WITHDRAWALR_REQUEST]: (_state, _action) =>
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
        withdrawalRequest: action.response,
      }
    }),
    FAIL: (state, action) => ({
      ...state,
      isFetching: false,
      error: action.error,
    }),
  }),

  [PATCH_WITHDRAWALR_REQUEST]: (_state, _action) =>
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
