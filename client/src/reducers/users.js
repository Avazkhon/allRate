import {
  GET_USERS,
  GET_USERS_BY_IDS,
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
    }),
    FAIL: (state, action) => ({
      ...state,
      error: action.error,
      isFetching: true,
    }),
  })
}

export default createReducer(initState, {
  [GET_USERS]: (_state, _action) =>
  changeState(_state, _action),

  [GET_USERS_BY_IDS]: (_state, _action) =>
  changeState(_state, _action),
})
