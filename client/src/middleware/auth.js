import {
  AUTH_REGISTRATION,
  AUTH_LOGIN,
} from '../constants'

import {
  callApi,
  successCallback,
  failCallback,
} from './utils';

const auth = store => next => action => {
  const {
    type,
    meta,
    data,
  } = action;

  if (
    type !== AUTH_LOGIN &&
    type !== AUTH_REGISTRATION
  ) {
    return next(action);
  }
  next(action);
  return callApi({...meta, data})
  .then(successCallback, failCallback);
}

export default auth;
