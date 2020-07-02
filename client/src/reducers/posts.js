import {
  GET_POSTS_PAGE,
} from '../constants';

import {
  createReducer,
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
  [GET_POSTS_PAGE]: (_state, _action) =>
  changeStateBattery(_state, _action),
})
