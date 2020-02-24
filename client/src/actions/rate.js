import { CALL_API } from '../middleware/api';
import {
  CREATE_NEW_RATE_REQUEST,
  CREATE_NEW_RATE_SUCCESS,
  CREATE_NEW_RATE_FAIL,

  GET_RATES_REQUEST,
  GET_RATES_SUCCESS,
  GET_RATES_FAIL,

  GET_RATE_BY_ID_REQUEST,
  GET_RATE_BY_ID_SUCCESS,
  GET_RATE_BY_ID_FAIL,
} from '../constants';

export function creteNewRate (data) {
  const fullDtat = { ...data, localTime: new Date() }
  return dispatch => dispatch({
    [CALL_API]: {
      types: [  CREATE_NEW_RATE_REQUEST, CREATE_NEW_RATE_SUCCESS, CREATE_NEW_RATE_FAIL],
      method: "POST",
      endpoint: "rate",
      data: fullDtat,
    }
  })
}


export function getRates (userId) {
  return dispatch => dispatch({
    [CALL_API]: {
      types: [GET_RATES_REQUEST, GET_RATES_SUCCESS, GET_RATES_FAIL],
      method: "GET",
      endpoint: `rate?userId=${userId}`,
    }
  })
}

export function getRateByID (rateId) {
  return dispatch => dispatch({
    [CALL_API]: {
      types: [GET_RATE_BY_ID_REQUEST, GET_RATE_BY_ID_SUCCESS, GET_RATE_BY_ID_FAIL],
      method: "GET",
      endpoint: `rate?id=${rateId}`,
    }
  })
}
