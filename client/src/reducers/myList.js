import {
  GET_MY_LIST,
  GET_MY_NEWS,
  GET_ALL_NEWS,
} from '../constants';

import {
  createReducer,
  createRequestReducer,
} from '../utils';

const initState = {
  isFetching: false,
  data: null,
  error: null,
  list: 'myList',
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
      list: action.list
    }),
    FAIL: (state, action) => ({
      ...state,
      error: action.error,
      isFetching: false,
    }),
  })
}

export default createReducer(initState, {
  [GET_MY_LIST]: (_state, _action) =>
  changeState(_state, _action),

  [GET_MY_NEWS]: (_state, _action) =>
  changeState(_state, _action),

  [GET_ALL_NEWS]: (_state, _action) =>
  changeState(_state, _action),
})
