import {
  GET_PURSE,
  GET_PURSE_HISTORY
} from '../constants';

export function getPurse () {
  return dispatch => dispatch({
    type: GET_PURSE,
    meta: {
      method: "GET",
      endpoint: 'purse',
    }
  })
}

export function getPurseHistory () {
  return dispatch => dispatch({
    type: GET_PURSE_HISTORY,
    meta: {
      method: "GET",
      endpoint: 'purse/history',
    }
  })
}
