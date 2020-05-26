
import {
  GET_MY_LIST,
  GET_MY_NEWS,
  GET_ALL_NEWS,
} from '../constants';

export function getMyList (userId) {
  return dispatch => dispatch({
    type: GET_MY_LIST,
    list: 'myList',
    meta: {
      method: 'GET',
      endpoint:`list/?nameList=myList&userId=${userId}`
    }
  });
};

export function getMyNews (userId) {
  return dispatch => dispatch({
    type: GET_MY_NEWS,
    list: 'myNews',
    meta: {
      method: 'GET',
      endpoint:`list/?nameList=myNews&userId=${userId}`
    }
  });
};

export function getAllNews () {
  return dispatch => dispatch({
    type: GET_ALL_NEWS,
    list: 'allNews',
    meta: {
      method: 'GET',
      endpoint:`list/?nameList=allNews`
    }
  });
};
