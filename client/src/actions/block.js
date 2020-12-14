import {
  POST_BLOCK,
  GET_BLOCK_BY_ID,
} from '../constants';

export function postBlock (data, rateId) {
  return dispatch => dispatch({
    type: POST_BLOCK,
    meta: {
      method: 'POST',
      endpoint:`block`,
      queryParams: {
        rateId
      },
      data,
    }
  });
}

export function getBlockById (rateId) {
  return dispatch => dispatch({
    type: GET_BLOCK_BY_ID,
    meta: {
      method: 'GET',
      endpoint:`block`,
      queryParams: {
        rateId
      },
    }
  });
}
