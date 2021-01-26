import {
  GET_RATES,
  GET_RATES_PAGE,
  CHANGE_RATING_RATE,
  SEARCH_BETS,
} from '../constants'

import {
  createReducer,
  createRequestReducer,
  changeState,
  changeStateBattery,
} from '../utils';

const initState = {
  isFetching: false,
  error: null,
  data: {
    docs: [],
  },
};

export default createReducer(initState, {
  [CHANGE_RATING_RATE]: (_state, _action) =>
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
        docs: state.data.docs.map((rate) => {
          if (rate._id === action.response._id) {
            return action.response;
          }
          return rate;
        }),
      },
    }),
    FAIL: (state, action) => ({
      ...state,
      error: action.error,
      isFetching: false,
    }),
  }),

  [GET_RATES]: (_state, _action) =>
  changeState(_state, _action),

  [GET_RATES_PAGE]: (_state, _action) =>
  changeStateBattery(_state, _action),
  [SEARCH_BETS]: (_state, _action) =>
  changeStateBattery(_state, _action),

});
