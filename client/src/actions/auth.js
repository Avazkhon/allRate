import {
  AUTH_REGISTRATION,
  AUTH_LOGIN,
} from '../constants'

export function authRegistration(email) {
  return dispatch => dispatch({
    type: AUTH_REGISTRATION,
    meta: {
      method: 'POST',
      endpoint: 'auth-registration/',
      // data: {
      //   email,
      // }
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
