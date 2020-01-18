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

  // if (
  //   type !== AUTH_LOGIN &&
  //   type !== AUTH_REGISTRATION
  // ) {
  //   return next(action);
  // }
  if (!meta.method) {
    return next(action);
  }
  next({...action, status: 'SEND'})

  return callApi({...meta, data})
  .then(successCallback, failCallback)
  .then(response => {
    next({...action, status: response.status, response});
    return response;
  })
  .catch((err) => {
    next({...action, status: 'FAIL', err});
    return err;
  });
}

export default auth;
