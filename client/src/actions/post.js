
import {
  CREATE_POST,
  CHANGE_RATING_POST,
  ADD_COUNT_VIEWS_POST,
  GET_POSTS_PAGE,
  GET_POST_BY_ID,
  PUT_POST_BY_ID,
  GET_BEST_POSTS_BY_DATE
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

export function getPostsPage ({ page, limit, authorId, subscriptionsId }) {
  return dispatch => dispatch({
    type: GET_POSTS_PAGE,
    meta: {
      method: 'GET',
      endpoint:`post/?page=${page}&limit=${limit}${authorId ? '&authorId=' + authorId : '' }${subscriptionsId ? '&subscriptionsId=' + subscriptionsId : '' }`,
    }
  });
}

export function getPostPostsByDate ({ page, limit, createDataStart, createDateEnd }) {
  return dispatch => dispatch({
    type: GET_BEST_POSTS_BY_DATE,
    meta: {
      method: 'GET',
      endpoint:`post/?page=${page}&limit=${limit}${createDataStart ? '&createDataStart=' + createDataStart : ''}${createDateEnd ? '&createDateEnd=' + createDateEnd : ''}`,
    }
  });
}

export function getPostById (postId) {
  return dispatch => dispatch({
    type: GET_POST_BY_ID,
    meta: {
      method: 'GET',
      endpoint:`post/`,
      queryParams: {
        postId
      }
    }
  });
}

export function putPostById (postId, data) {
  return dispatch => dispatch({
    type: PUT_POST_BY_ID,
    meta: {
      method: 'PUT',
      endpoint:`post/`,
      queryParams: {
        postId
      },
      data
    }
  });
}
