import {
  POST_BLOCK
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
