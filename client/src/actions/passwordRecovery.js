import {
  POSRT_PASSWORD_RECOVERY,
} from '../constants';

export function passwordRecoveryStart(email) {
  return dispatch => dispatch({
    type: POSRT_PASSWORD_RECOVERY,
    meta: {
      method: 'POST',
      endpoint:`password-recovery`,
      data: { email }
    }
  });
}
