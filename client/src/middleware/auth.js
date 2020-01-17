import {
  AUTH_REGISTRATION,
  AUTH_LOGIN,
} from '../constants'

const auth = store => next => action => {
  next(action);
  const {
    meta: {
      method,
      endpoint,
      query,
    },
    data,
  } = action;

  const url = `http://localhost:8080/${endpoint ? endpoint : ''}/${query ? query : ''}`

  return fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    credentials: "include",
    body: JSON.stringify(data),
  })
}
export default auth;
