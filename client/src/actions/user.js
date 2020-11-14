import {
  GET_USERS_BY_IDS,
  GET_USERS_PAGINATE,
  GET_USER_FOR_PAGE_BY_ID,
} from '../constants';

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

export function userPaginate (page, limit) {
  return dispatch => dispatch({
    type: GET_USERS_PAGINATE,
    meta: {
      method: 'GET',
      endpoint:`user/?page=${page}&limit=${limit}`
    }
  });
}

export function getUserForPageById (userId) {
  return dispatch => dispatch({
    type: GET_USER_FOR_PAGE_BY_ID,
    meta: {
      method: 'GET',
      endpoint: 'user',
      queryParams: {
        id: userId
      }
    }
  });
}
