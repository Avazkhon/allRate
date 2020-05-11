
import {
  CHANGE_RATING
} from '../constants';

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
