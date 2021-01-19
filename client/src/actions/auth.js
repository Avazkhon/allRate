import {
  GET_USER_BY_ID,
  LOG_IN,
  REGISTRATION_USER,
  LOG_AUT,
  CREATE_NEW_USER,
  CHANGE_RATING_USER,
  POST_UPDATE_USERS_BY_ID,
  UPDATE_USER_AUTH,
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


export function authoLogAut () {
  return dispathc => dispathc({
    type: LOG_AUT,
    meta: {
      method: 'GET',
      endpoint: 'auth',
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

export function getUserById(userId) {
  return (dispatch, getState) => dispatch({
    type: GET_USER_BY_ID,
    meta: {
      method: 'GET',
      endpoint: 'user/?id='+userId,
    }
  });
}

export function changeRatingUser (data, userId, action) {
  return dispatch => dispatch({
    type: CHANGE_RATING_USER,
    meta: {
      method: 'PATCH',
      endpoint:`rating/?userId=${userId}&action=${action}`,
      data
    }
  });
}

export function postUpdateUsersById (mail_confirmation) {
  return dispatch => dispatch({
    type: POST_UPDATE_USERS_BY_ID,
    meta: {
      method: 'PATCH',
      endpoint:`mail_confirmation/?mail_confirmation=${mail_confirmation}`,
    }
  });
}

export function updateUserAuth(data) {
  return dispatch => dispatch({
    type: UPDATE_USER_AUTH,
    meta: {
      method: 'PUT',
      endpoint: 'user',
      data
    }
  });
}
