import {
  GET_RATES,
  GET_RATES_PAGE,
} from '../constants'

import {
  createReducer,
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

  [GET_RATES]: (_state, _action) =>
  changeState(_state, _action),

  [GET_RATES_PAGE]: (_state, _action) =>
  changeStateBattery(_state, _action),

});
