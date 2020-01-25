import {
  REQUEST_LOGIN,
  SUCCESS_LOGIN,
  FAIL_LOGIN,

  REQUEST_GET_USER_BY_ID,
  SUCCESS_GET_USER_BY_ID,
  FAIL_GET_USER_BY_ID,

  REQUEST_LOGIN_AUT,
  SUCCESS_LOGIN_AUT,
  FAIL_LOGIN_AUT,
} from '../constants'

import {
  getDataUserFromLocalStoragr,
  deleteDataUserFromLocalStoragr,
  setDataUserFromLocalStoragr,
} from '../utils';

const initState = {
  isFetching: false,
  auth: getDataUserFromLocalStoragr(),
  error: null,
  userData: null,
};

export default function auth(state = initState, action) {

  if (action.type === REQUEST_LOGIN) {
    return {
      ...state,
      isFetching: true,
    }
  }
  if (action.type === SUCCESS_LOGIN) {
    setDataUserFromLocalStoragr(action.response);
    return {
      ...state,
      isFetching: false,
      auth: action.response,
    }
  }
  if (action.type === FAIL_LOGIN) {
    return {
      ...state,
     isFetching: false,
     error: action.error,
    }
  }

  if (action.type === REQUEST_LOGIN_AUT) {
    return {
      ...state,
      isFetching: true,
      auth: null,
    }
  }
  if (action.type === SUCCESS_LOGIN_AUT) {
    deleteDataUserFromLocalStoragr();
    return {
      ...state,
      isFetching: false,
      auth: null,
    }
  }
  if (action.type === FAIL_LOGIN_AUT) {
    return {
      ...state,
     isFetching: false,
     error: action.error,
    }
  }

  if (action.type === REQUEST_GET_USER_BY_ID) {
    return {
      ...state,
      isFetching: true,
    }
  }
  if (action.type === SUCCESS_GET_USER_BY_ID) {
    return {
      ...state,
      isFetching: false,
      userData: action.response,
    }
  }
  if (action.type === FAIL_GET_USER_BY_ID) {
    return {
      ...state,
     isFetching: false,
     error: action.error,
     userData: null,
    }
  }

  return state;
}
