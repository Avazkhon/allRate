import {
  GET_USERS
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
