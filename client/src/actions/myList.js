
import {
  GET_MY_LIST,
  GET_MY_NEWS,
} from '../constants';

export function getMyList (userId) {
  return dispatch => dispatch({
    type: GET_MY_LIST,
    list: 'myList',
    meta: {
      method: 'GET',
      endpoint:`my_list/?userId=${userId}`
    }
  });
};

export function getMyNews (userId) {
  return dispatch => dispatch({
    type: GET_MY_NEWS,
    list: 'myNews',
    meta: {
      method: 'GET',
      endpoint:`my_news/?userId=${userId}`
    }
  });
};
