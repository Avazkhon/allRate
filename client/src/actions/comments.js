import {
  GET_COMMENTS,
  SAVE_COMMENTS
} from '../constants';

export function getComments({ commentsId }) {
  return dispatch => dispatch({
    type: GET_COMMENTS,
    meta: {
      method: 'GET',
      endpoint:`comments/${commentsId}`,
    }
  });
}


export function saveComments({ commentsId, text }) {
  return dispatch => dispatch({
    type: SAVE_COMMENTS,
    meta: {
      method: 'POST',
      endpoint:`comments/${commentsId}`,
      data: { text }
    }
  });
}