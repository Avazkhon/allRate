import {
  GET_COMMON_RATES
} from '../constants';

export function getCommonRates (userId) {
  return dispatch => dispatch({
    type: GET_COMMON_RATES,
    meta: {
      method: "GET",
      endpoint: `rate?all=true`,
    }
  })
}
