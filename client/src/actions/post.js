
import {
  CREATE_POST,
  CHANGE_RATING,
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

export function changeRatingPost (data, postId, action) {
  return dispatch => dispatch({
    type: CHANGE_RATING,
    meta: {
      method: 'PUT',
      endpoint:`post/rating/?postId=${postId}&action=${action}`,
      data
    }
  });
}
