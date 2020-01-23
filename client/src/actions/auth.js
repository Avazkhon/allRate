import { CALL_API } from '../middleware/api';
import {
  AUTH_REGISTRATION,
  AUTH_LOGIN,
  CREATE_NEW_USER,
  GET_USER_BY_ID,

  REQUEST_GET_USER_BY_ID,
  SUCCESS_GET_USER_BY_ID,
  FAIL_GET_USER_BY_ID,
} from '../constants'

export function authRegistration() {
  return dispatch => dispatch({
    type: AUTH_REGISTRATION,
    meta: {
      method: 'POST',
      endpoint: 'user',
    }
  });
}

export function authoLogin (data) {
  return dispathc => dispathc({
    type: AUTH_LOGIN,
    meta: {
      method: 'POST',
      endpoint: 'auth',
    },
    data,
  });
}

export function createNewUser (data) {
  return dispathc => dispathc({
    type: CREATE_NEW_USER,
    meta: {
      method: 'POST',
      endpoint: 'user',
    },
    data,
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
