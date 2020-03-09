import {
  CREATE_NEW_RATE,

  GET_RATES,

  GET_RATE_BY_ID,

  PUT_RATE,
} from '../constants';

export function creteNewRate (data) {
  const fullDtat = { ...data, localTime: new Date() }
  return dispatch => dispatch({
    type: CREATE_NEW_RATE,
    meta: {
      method: "POST",
      endpoint: "rate",
      data: fullDtat,
    }
  })
}


export function getRates (userId) {
  return dispatch => dispatch({
    type: GET_RATES,
    meta: {
      method: "GET",
      endpoint: `rate?userId=${userId}`,
    }
  })
}

export function getRateByID (rateId) {
  return dispatch => dispatch({
    type:GET_RATE_BY_ID,
    meta: {
      method: "GET",
      endpoint: `rate?id=${rateId}`,
    }
  })
}

export function putRateByID (data) {
  return dispatch => dispatch({
    type: PUT_RATE,
    meta: {
      method: "PUT",
      endpoint: `rate?id=${data._id}`,
      data
    }
  })
}
