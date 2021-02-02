import {
  CREATE_SUPPORT,
  GET_SUPPORT_LIST,
  GET_SUPPORT_BY_ID,
  PUT_SUPPORT_BY_ID,
} from '../constants';

export function createSuppot (data) {
  return dispatch => dispatch({
    type: CREATE_SUPPORT,
    meta: {
      method: 'POST',
      endpoint:'support',
      data
    }
  });
}

export function getSupportList (queryParams) {
  return dispatch => dispatch({
    type: GET_SUPPORT_LIST,
    meta: {
      method: 'GET',
      endpoint:'support',
      queryParams
    }
  });
}

export function getSupportByID (supportId) {
  return dispatch => dispatch({
    type: GET_SUPPORT_BY_ID,
    meta: {
      method: 'GET',
      endpoint:'support',
      queryParams: {
        supportId
      }
    }
  });
}

export function putSupportByID (data) {
  return dispatch => dispatch({
    type: PUT_SUPPORT_BY_ID,
    meta: {
      method: 'PUT',
      endpoint:'support',
      queryParams: {
        supportId: data._id
      },
      data
    }
  });
}
