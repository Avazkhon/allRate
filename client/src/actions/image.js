import {
  CHANGE_IMG,
} from '../constants';

export function changeImg (files) {

  return dispatch => dispatch({
    type: CHANGE_IMG,
    meta: {
      method: 'POST',
      serverName: 'media',
      endpoint:'fileUpload',
      field: 'image',
      files
    }
  });
}
