import { CALL_API } from '../middleware/api';
import {
  GET_COMMON_RATES_REQUEST,
  GET_COMMON_RATES_SUCCESS,
  GET_COMMON_RATES_FAIL,
} from '../constants';

export function getCommonRates (userId) {
  return dispatch => dispatch({
    [CALL_API]: {
      types: [GET_COMMON_RATES_REQUEST, GET_COMMON_RATES_SUCCESS, GET_COMMON_RATES_FAIL],
      method: "GET",
      endpoint: `rate?all=true`,
    }
  })
}
