import {
  GET_USERS,
  GET_USERS_BY_IDS,
} from '../constants';

export function getUsers () {
  return dispatch => dispatch({
    type: GET_USERS,
    meta: {
      method: 'GET',
      endpoint:'user/?all=true'
    }
  });
}

export function getUsersByIds (arr) {
  const params = arr.join('&ids=');
  return dispatch => dispatch({
    type: GET_USERS_BY_IDS,
    meta: {
      method: 'GET',
      endpoint:`user/?ids=${params}`
    }
  });
}
