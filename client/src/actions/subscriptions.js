import {
  ADD_SUBSCRIPTION,
  GET_SUBSCRIPTION,
  DELETE_SUBSCRIPTION,
} from '../constants';

export function addSubscription (subscription, subscriber) {
  return dispatch => dispatch({
    type: ADD_SUBSCRIPTION,
    meta: {
      method: 'PUT',
      endpoint:`subscription/?subscription=${subscription}&subscriber=${subscriber}`
    }
  });
}

export function getSubscriptions (subscriber) {
  return dispatch => dispatch({
    type: GET_SUBSCRIPTION,
    meta: {
      method: 'GET',
      endpoint:`subscription/?id=${subscriber}`
    }
  });
}

export function deleteSubscriptions (subscription, subscriber) {
  return dispatch => dispatch({
    type: DELETE_SUBSCRIPTION,
    meta: {
      method: 'DELETE',
      endpoint:`subscription/?subscription=${subscription}&subscriber=${subscriber}`
    }
  });
}
