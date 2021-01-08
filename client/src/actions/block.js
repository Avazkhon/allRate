import {
  POST_BLOCK,
  GET_BLOCK_BY_ID,
  PUT_BLOCK_BY_ID,
  POST_MAKE_BET,
  PUT_PAYMENT_RATE_BY_BLOCK,
  PATCH_PART_ADD_BLOCK,

  POST_ADD_BET_IN_BLOCK,
  DELETE_BLOCK,
  DELETE_BET
} from '../constants';

export function postBlock (data, rateId) {
  return dispatch => dispatch({
    type: POST_BLOCK,
    meta: {
      method: 'POST',
      endpoint:`block`,
      queryParams: {
        rateId
      },
      data,
    }
  });
}

export function getBlockById (rateId) {
  return dispatch => dispatch({
    type: GET_BLOCK_BY_ID,
    meta: {
      method: 'GET',
      endpoint:`block`,
      queryParams: {
        rateId
      },
    }
  });
}

export function putBlockById (data) {
  return dispatch => dispatch({
    type: PUT_BLOCK_BY_ID,
    meta: {
      method: 'PUT',
      endpoint:`block`,
      data,
    }
  });
}

export function postMakeBet (queryParams, data) {
  return dispatch => dispatch({
    type: POST_MAKE_BET,
    meta: {
      method: 'POST',
      endpoint:`make-bet`,
      queryParams,
      data,
    }
  });
}

export function putPaymentRateByBlock (blocksId) {
  return dispatch => dispatch({
    type: PUT_PAYMENT_RATE_BY_BLOCK,
    meta: {
      method: 'POST',
      endpoint:`rate/payment`,
      queryParams: {
        blocksId
      }
    }
  });
}

export function patchPartAddBlock (blocksId, data) {
  return dispatch => dispatch({
    type: PATCH_PART_ADD_BLOCK,
    meta: {
      method: 'PATCH',
      endpoint: 'block',
      queryParams: {
        blocksId
      },
      data
    }
  })
}

export function postAddBetInBlock (queryParams, data) {
  return dispatch => dispatch({
    type: POST_ADD_BET_IN_BLOCK,
    meta: {
      method: 'POST',
      endpoint: 'block/bet',
      queryParams,
      data
    }
  })
}

export function deleteBlock (queryParams) {
  return dispatch => dispatch({
    type: DELETE_BLOCK,
    meta: {
      method: 'DELETE',
      endpoint: 'block',
      queryParams
    }
  })
}

export function deleteBet (queryParams) {
  return dispatch => dispatch({
    type: DELETE_BET,
    meta: {
      method: 'DELETE',
      endpoint: 'block/bet',
      queryParams,
    }
  })
}
