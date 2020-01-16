import {
  AUTH_REGISTRATION,
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
