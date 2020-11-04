import {
  GET_WITHDRAWALR_REQUEST_ADMIN,
  PATCH_WITHDRAWALR_REQUEST_ADMIN,
} from '../../constants';

export function getWithdrawalRequestAdmin ({page, limit}) {
  return dispatch => dispatch({
    type: GET_WITHDRAWALR_REQUEST_ADMIN,
    meta: {
      method: 'GET',
      endpoint: `admin/withdrawal-request/?page=${page}&limit=${limit}`,
    }
  });
}

export function patchWithdrawalRequestAdmin (id, data) {
  return dispatch => dispatch({
    type: PATCH_WITHDRAWALR_REQUEST_ADMIN,
    meta: {
      method: 'PATCH',
      endpoint: `admin/withdrawal-request?id=${id}`,
      data,
    }
  });
}
