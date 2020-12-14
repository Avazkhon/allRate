import {
  POST_BLOCK,
  GET_BLOCK_BY_ID,
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
  [POST_BLOCK]: (_state, _action) =>
  changeState(_state, _action),

  [GET_BLOCK_BY_ID]: (_state, _action) =>
  changeState(_state, _action),
});
