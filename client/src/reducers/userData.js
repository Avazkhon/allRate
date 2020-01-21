import {
  GET_USER_BY_ID,
} from '../constants'

import {
  getDataUserFromLocalStoragr,
} from '../utils';

const initState = {
  isFetching: false,
  data: getDataUserFromLocalStoragr(),
  error: null,
};

export default function userData(state = initState, action) {

  if (action.type === GET_USER_BY_ID) {
    if (action.status === 'SEND') {
      return {
        ...state,
        isFetching: true,
      }
    }
    if (action.status === 'SUCCESS') {
      return {
        ...state,
        data: {
          ...action.response.data,
        },
        isFetching: false,
      }
    }

    if (action.status === 'FAIL') {
      return {
        ...state,
        isFetching: false,
        error: action.message,
      }
    }
  }
  return state;
}
