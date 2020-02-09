import { CALL_API } from '../middleware/api';
import {
  CREATE_NEW_RATE_REQUEST,
  CREATE_NEW_RATE_SUCCESS,
  CREATE_NEW_RATE_FAIL,
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
