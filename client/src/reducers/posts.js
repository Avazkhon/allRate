import {
  GET_POSTS_PAGE,
  CHANGE_RATING_POST,
} from '../constants';

import {
  createReducer,
  createRequestReducer,
  changeStateBattery,
} from '../utils';

const initState = {
  isFetching: false,
  data: {
    docs: [],
  },
  error: null,
};

export default createReducer(initState, {

  [CHANGE_RATING_POST]: (_state, _action) =>
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
        docs: state.data.docs.map((post) => {
          if (post._id === action.response._id) {
            return action.response;
          }
          return post;
        }),
      },
    }),
    FAIL: (state, action) => ({
      ...state,
      error: action.error,
      isFetching: false,
    }),
  }),

  [GET_POSTS_PAGE]: (_state, _action) =>
  changeStateBattery(_state, _action),
})
