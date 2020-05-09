
import {
  CREATE_POST
} from '../constants';

export function createPost (data) {
  return dispatch => dispatch({
    type: CREATE_POST,
    meta: {
      method: 'POST',
      endpoint:`post`,
      data
    }
  });
}
