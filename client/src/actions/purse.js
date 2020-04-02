import {
  GET_PURSE
} from '../constants';

export function getPurse () {
  return dispatch => dispatch({
    type: GET_PURSE,
    meta: {
      method: "GET",
      endpoint: 'purse',
    }
  })
};
