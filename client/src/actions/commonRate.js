import {
  GET_COMMON_RATES
} from '../constants';

export function getCommonRates (userId) {
  const endpoint = userId ? `rate?userId=${userId}` : `rate?all=true`
  return dispatch => dispatch({
    type: GET_COMMON_RATES,
    meta: {
      method: "GET",
      endpoint,
    }
  })
}
