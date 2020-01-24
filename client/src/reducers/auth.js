import {
  REQUEST_LOGIN,
  SUCCESS_LOGIN,
  FAIL_LOGIN,
} from '../constants'

import {
  getDataUserFromLocalStoragr,
} from '../utils';

const initState = {
  isFetching: false,
  data: getDataUserFromLocalStoragr(),
  error: null,
};

export default function auth(state = initState, action) {

  if (action.type === REQUEST_LOGIN) {
    return {
      ...state,
      isFetching: true,
    }
  }
  if (action.type === SUCCESS_LOGIN) {
    return {
      isFetching: false,
      data: action.response,
    }
  }
  if (action.type === FAIL_LOGIN) {
    return {
     isFetching: false,
     error: action.error,
    }
  }

  return state;
}
