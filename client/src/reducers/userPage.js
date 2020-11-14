import {
  GET_USER_FOR_PAGE_BY_ID,
} from '../constants'

import {
  createReducer,
  createRequestReducer,
} from '../utils';

const initState = {
  isFetching: false,
  data: {},
  error: null,
};

function changeState (_state, _action) {
  return createRequestReducer(_state, _action, {
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
  })
}

export default createReducer(initState, {

  [GET_USER_FOR_PAGE_BY_ID]: (_state, _action) =>
  changeState(_state, _action),

})
