import {
  GET_CATEGORIES
} from '../constants'

import {
  createReducer,
  changeState,
} from '../utils';

const initState = {
  isFetching: false,
  error: null,
  data: {},
};

export default createReducer(initState, {
  [GET_CATEGORIES]: (_state, _action) =>
  changeState(_state, _action),
});
