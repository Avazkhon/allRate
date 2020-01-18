import {
  isBrowser,
} from '../utils';
async function callApi (paramsCall) {
  const {
    method,
    endpoint,
    query,
    data,
  } = paramsCall;

  const url = `http://localhost:8080/${endpoint ? endpoint : ''}/${query ? query : ''}`
  return fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    credentials: "include",
    body: JSON.stringify(data),
  })
  .then(res => {
    const {
      status,
      statusText,
      ok
    } = res;
    return res.json().then(body => ({ body , status, statusText, ok }));
  })
};

function successCallback (response) {
  const {
    status,
    statusText,
    ok,
    body,
  } = response;
  if (status >= 200 && status <= 299) {
    setDataUserToLocalStorage(body);
    return {
      status: 'SUCCESS',
      data: body ? body : {}
    }
  }

  return {
    status: 'FAIL',
    message: 'some kind of mistake happened!'
  }
};

function failCallback () {
  return {
    status: 'FAIL',
    message: 'some kind of mistake happened!'
  }
};

function setDataUserToLocalStorage (data) {
  if (isBrowser()) {
    localStorage.setItem('userData', JSON.stringify(data));
  }
}

export {
  callApi,
  successCallback,
  failCallback
};
