import { CALL_API } from '../middleware/api';
import {
  REQUEST_GET_USER_BY_ID,
  SUCCESS_GET_USER_BY_ID,
  FAIL_GET_USER_BY_ID,

  REQUEST_LOGIN,
  SUCCESS_LOGIN,
  FAIL_LOGIN,

  REGISTRATION_USER_REQUEST,
  REGISTRATION_USER_SUCCESS,
  REGISTRATION_USER_FAIL,

  REQUEST_LOGIN_AUT,
  SUCCESS_LOGIN_AUT,
  FAIL_LOGIN_AUT,

  CREATE_NEW_USER_REQUEST,
  CREATE_NEW_USER_SUCCESS,
  CREATE_NEW_USER_FAIL,
} from '../constants'

export function authRegistration() {
  return dispatch => dispatch({
    [CALL_API]: {
      types: [REGISTRATION_USER_REQUEST, REGISTRATION_USER_SUCCESS, REGISTRATION_USER_FAIL],
      method: 'POST',
      endpoint: 'user',
    }
  });
}

export function authoLogin (data) {
  return dispathc => dispathc({
    [CALL_API]: {
      types: [REQUEST_LOGIN, SUCCESS_LOGIN, FAIL_LOGIN],
      method: 'POST',
      endpoint: 'auth',
      data
    }
  });
}


export function authoLogAut (data) {
  return dispathc => dispathc({
    [CALL_API]: {
      types: [REQUEST_LOGIN_AUT, SUCCESS_LOGIN_AUT, FAIL_LOGIN_AUT],
      method: 'POST',
      endpoint: 'auth/?aut=true',
      data: null,
    }
  });
}

export function createNewUser (data) {
  return dispathc => dispathc({
    [CALL_API]: {
      types: [CREATE_NEW_USER_REQUEST, CREATE_NEW_USER_SUCCESS, CREATE_NEW_USER_FAIL],
      method: 'POST',
      endpoint: 'user',
      data,
    }
  });
}

export function getUserById(url) {
  return (dispatch, getState) => dispatch({
    [CALL_API]: {
      types: [REQUEST_GET_USER_BY_ID, SUCCESS_GET_USER_BY_ID, FAIL_GET_USER_BY_ID],
      method: 'GET',
      endpoint: url
    }
  });
}
