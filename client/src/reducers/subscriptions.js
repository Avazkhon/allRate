import {
  ADD_SUBSCRIPTION,
  GET_SUBSCRIPTION,
  DELETE_SUBSCRIPTION,
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
  [ADD_SUBSCRIPTION]: (_state, _action) =>
  changeState(_state, _action),

  [GET_SUBSCRIPTION]: (_state, _action) =>
  changeState(_state, _action),

  [DELETE_SUBSCRIPTION]: (_state, _action) =>
  changeState(_state, _action),

})
