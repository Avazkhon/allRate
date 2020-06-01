
import {
  CREATE_POST,
  CHANGE_RATING_POST,
  ADD_COUNT_VIEWS_POST,
  GET_POSTS,
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
    type: CHANGE_RATING_POST,
    meta: {
      method: 'PATCH',
      endpoint:`rating/?postId=${postId}&action=${action}`,
      data
    }
  });
}

export function addCountViewsPost (postId) {
  return dispatch => dispatch({
    type: ADD_COUNT_VIEWS_POST,
    meta: {
      method: 'PATCH',
      endpoint:`views/?postId=${postId}`,
    }
  });
}

export function getPosts ({ page, limit }) {
  return dispatch => dispatch({
    type: GET_POSTS,
    meta: {
      method: 'GET',
      endpoint:`post/?page=${page}&limit=${limit}`,
    }
  });
}
