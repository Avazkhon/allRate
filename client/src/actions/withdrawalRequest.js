import {
  GET_WITHDRAWALR_REQUEST,
  POST_WITHDRAWALR_REQUEST,
  PATCH_WITHDRAWALR_REQUEST,
} from '../constants';

export function getWithdrawalRequest ({page, limit}) {
  return dispatch => dispatch({
    type: GET_WITHDRAWALR_REQUEST,
    meta: {
      method: 'GET',
      endpoint: `withdrawal-request/?page=${page}&limit=${limit}`,
    }
  });
}

export function postWithdrawalRequest (data) {
  return dispatch => dispatch({
    type: POST_WITHDRAWALR_REQUEST,
    meta: {
      method: 'POST',
      endpoint: 'withdrawal-request',
      data,
    }
  });
}

export function patchWithdrawalRequest (data) {
  return dispatch => dispatch({
    type: PATCH_WITHDRAWALR_REQUEST,
    meta: {
      method: 'PATCH',
      endpoint: 'withdrawal-request',
      data,
    }
  });
}
