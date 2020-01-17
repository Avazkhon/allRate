import {
  AUTH_REGISTRATION,
  AUTH_LOGIN,
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
