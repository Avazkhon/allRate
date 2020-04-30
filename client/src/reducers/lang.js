import {
  CHANGE_LANG,
  GET_LANG,
} from '../constants';

import {
  createReducer,
  createRequestReducer,
} from '../utils';

const initState = {
  isFetching: false,
  lang: 'RU',
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
      lang: action.response,
    }),
    FAIL: (state, action) => ({
      ...state,
      error: action.error,
    }),
  })
}

export default createReducer(initState, {
  [CHANGE_LANG]: (_state, _action) =>
  changeState(_state, _action),

  [GET_LANG]: (_state, _action) =>
  changeState(_state, _action),
})
