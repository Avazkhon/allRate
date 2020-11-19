import {
  POSRT_PASSWORD_RECOVERY,
  PUT_PASSWORD_RECOVERY,
} from '../constants';

export function passwordRecoveryStart(email) {
  return dispatch => dispatch({
    type: POSRT_PASSWORD_RECOVERY,
    meta: {
      method: 'POST',
      endpoint:`password-recovery/userPassword`,
      data: { email }
    }
  });
}

export function passwordRecoveryFinish({password, recoveryId}) {
  return dispatch => dispatch({
    type: PUT_PASSWORD_RECOVERY,
    meta: {
      method: 'PUT',
      endpoint:`password-recovery/userPassword`,
      queryParams: {
        recoveryId
      },
      data: { password }
    }
  });
}
