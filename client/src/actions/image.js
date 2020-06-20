import {
  CHANGE_IMG,
} from '../constants';

export function changeImg (field, data, { postId, rateId }) {
  let endpoint = '';
  if (postId) {
    endpoint = `/?post=${postId}`;
  } else if (rateId) {
    endpoint = `/?rate=${rateId}`;
  }
  return dispatch => dispatch({
    type: CHANGE_IMG,
    meta: {
      method: 'POST',
      endpoint:'image' + endpoint ,
      files: data,
      field,
    }
  });
}
