import {
  GET_USER_BY_ID,
  LOG_IN,
  REGISTRATION_USER,
  LOG_AUT,
  CREATE_NEW_USER,
} from '../constants'

export function authRegistration() {
  return dispatch => dispatch({
    type: REGISTRATION_USER,
    meta: {
      method: 'POST',
      endpoint: 'user',
    }
  });
}

export function authoLogin (data) {
  return dispathc => dispathc({
    type: LOG_IN,
    meta: {
      method: 'POST',
      endpoint: 'auth',
      data
    }
  });
}


export function authoLogAut (data) {
  return dispathc => dispathc({
    type: LOG_AUT,
    meta: {
      method: 'POST',
      endpoint: 'auth/?aut=true',
      data: null,
    }
  });
}

export function createNewUser (data) {
  return dispathc => dispathc({
    type: CREATE_NEW_USER,
    meta: {
      method: 'POST',
      endpoint: 'user',
      data,
    }
  });
}

export function getUserById(url) {
  return (dispatch, getState) => dispatch({
    types: GET_USER_BY_ID,
    meta: {
      method: 'GET',
      endpoint: url
    }
  });
}
