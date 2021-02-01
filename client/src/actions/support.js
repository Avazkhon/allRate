import {
  CREATE_SUPPORT,
} from '../constants';

export function createSuppot (data) {
  return dispatch => dispatch({
    type: CREATE_SUPPORT,
    meta: {
      method: 'POST',
      endpoint:'support',
      data
    }
  });
}
