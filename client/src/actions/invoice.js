import {
  POST_INVOICE
} from '../constants';

export function postInvoice (data) {
  return dispatch => dispatch({
    type: POST_INVOICE,
    meta: {
      method: "POST",
      endpoint: 'invoice',
      data,
    }
  })
};
