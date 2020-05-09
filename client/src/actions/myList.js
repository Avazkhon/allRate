
import {
  GET_MY_LIST
} from '../constants';

export function getMyList (userId) {
  return dispatch => dispatch({
    type: GET_MY_LIST,
    meta: {
      method: 'GET',
      endpoint:`my_list/?userId=${userId}`
    }
  });
}
