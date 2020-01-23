import {
  REQUEST_GET_USER_BY_ID,
  SUCCESS_GET_USER_BY_ID,
  FAIL_GET_USER_BY_ID,
} from '../constants'

import {
  getDataUserFromLocalStoragr,
} from '../utils';

const initState = {
  isFetching: false,
  data: null,
  error: null,
};



export default function userData(state = initState, action) {
 if (action.type === REQUEST_GET_USER_BY_ID) {
   return {
     ...state,
     isFetching: true,
   }
 }
 if (action.type === SUCCESS_GET_USER_BY_ID) {
   return {
     isFetching: false,
     data: action.response,
   }
 }
 if (action.type === FAIL_GET_USER_BY_ID) {
   return {
    isFetching: false,
    error: response.error,
   }
 }
  return state;
}
