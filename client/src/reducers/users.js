import {
  GET_USERS_BY_IDS,
  GET_USERS_PAGINATE,
} from '../constants'

import {
  createReducer,
  createRequestReducer,
} from '../utils';

const initState = {
  isFetching: false,
  data: {
    docs: [],
  },
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
      data: {
        docs: [...state.data.docs, ...action.response]
      },
    }),
    FAIL: (state, action) => ({
      ...state,
      error: action.error,
      isFetching: false,
    }),
  })
}

export default createReducer(initState, {

  [GET_USERS_BY_IDS]: (_state, _action) =>
  changeState(_state, _action),

  [GET_USERS_PAGINATE]: (_state, _action) => (
    createRequestReducer(_state, _action, {
      SEND: (state) => ({
        ...state,
        isFetching: true,
      }),
      SUCCESS: (state, action) => ({
        ...state,
        isFetching: false,
        error: null,
        data: {
          ...action.response,
          docs: [...state.data.docs, ...action.response.docs],
        },
      }),
      FAIL: (state, action) => ({
        ...state,
        error: action.error,
        isFetching: false,
      }),
    })
  )

})
