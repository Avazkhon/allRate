import {
  CHANGE_IMG,
} from '../constants';

export function changeImg (field, data) {
  return dispatch => dispatch({
    type: CHANGE_IMG,
    meta: {
      method: 'POST',
      endpoint:'image',
      files: data,
      field,
    }
  });
}
