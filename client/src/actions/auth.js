import {
  AUTH_REGISTRATION,
  AUTH_LOGIN,
  CREATE_NEW_USER,
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
