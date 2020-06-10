import {
  GET_POSTS,
} from '../constants';

import {
  createReducer,
  createRequestReducer,
} from '../utils';

const initState = {
  isFetching: false,
  data: null,
  error: null,
};

function changeState (_state, _action) {
  return createRequestReducer(_state, _action, {
    SEND: (state, action) => ({
      ...state,
      isFetching: true,
    }),
    SUCCESS: (state, action) => ({
      ...state,
      error: null,
      data: action.response,
      isFetching: false,
    }),
    FAIL: (state, action) => ({
      ...state,
      error: action.error,
      isFetching: false,
    }),
  })
}

export default createReducer(initState, {
  [GET_POSTS]: (_state, _action) =>
  changeState(_state, _action),
})
