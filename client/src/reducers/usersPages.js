import {
  GET_USERS_PAGINATE,
} from '../constants'

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
  [GET_USERS_PAGINATE]: (_state, _action) =>
    changeStateBattery(_state, _action),
})
