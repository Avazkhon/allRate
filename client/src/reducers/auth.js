import {
  LOG_IN,

  GET_USER_BY_ID,

  LOG_AUT,
} from '../constants'

import {
  deleteDataUserFromLocalStorag,
  setDataUserFromLocalStorag,
  createReducer,
  createRequestReducer,
} from '../utils';

const initState = {
  isFetching: false,
  auth: null,
  error: null,
  userData: null,
};


export default createReducer(initState, {
  [LOG_IN]: (_state, _action) =>
  createRequestReducer(_state, _action, {
    SEND: (state, action) => ({
      ...state,
      isFetching: true,
    }),
    SUCCESS: (state, action) => {
      setDataUserFromLocalStorag(action.response);
      return {
        ...state,
        isFetching: false,
        auth: action.response,
      }
    },
    FAIL: (state, action) => ({
      ...state,
      isFetching: false,
      error: action.error,
    }),
  }),

  [GET_USER_BY_ID]: (_state, _action) =>
  createRequestReducer(_state, _action, {
    SEND: (state, action) => ({
      ...state,
      isFetching: true,
    }),
    SUCCESS: (state, action) => ({
      ...state,
      isFetching: false,
      userData: action.response,
      auth: {
        userId: action.response._id,
        userName: action.response.userName,
      },
    }),
    FAIL: (state, action) => ({
      ...state,
      isFetching: false,
      error: action.error,
      userData: null,
    }),
  }),

  [LOG_AUT]: (_state, _action) =>
  createRequestReducer(_state, _action, {
    SEND: (state, action) => ({
      ...state,
      isFetching: true,
      auth: null,
    }),
    SUCCESS: (state, action) => {
      deleteDataUserFromLocalStorag();
      return {
        ...state,
        isFetching: false,
        auth: null,
      };
    },
    FAIL: (state, action) => ({
      ...state,
      isFetching: false,
      error: action.error,
    }),
  }),
})
