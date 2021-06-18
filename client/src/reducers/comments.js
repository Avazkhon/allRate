import { GET_COMMENTS, SAVE_COMMENTS } from '../constants';
import {
  createReducer,
  createRequestReducer,
} from '../utils';

const initState = {
  isFetching: false,
  data: null,
  error: null,
};

export default createReducer(initState, {
  [GET_COMMENTS]: (_state, _action) =>
    createRequestReducer(_state, _action, {
      SEND: (state, action) => ({
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
        data: null,
        isFetching: false,
        error: action.error,
      }),
    }),
  [SAVE_COMMENTS]: (_state, _action) =>
    createRequestReducer(_state, _action, {
      SEND: (state, action) => ({
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
        data: null,
        isFetching: false,
        error: action.error,
      }),
    }),
})
