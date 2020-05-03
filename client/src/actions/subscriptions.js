import {
  ADD_SUBSCRIPTION
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
