import {
  CREATE_SUPPORT,
  GET_SUPPORT_LIST,
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
