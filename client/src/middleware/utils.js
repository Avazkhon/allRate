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
}

function successCallback (response) {
  const {
    status,
    statusText,
    body,
  } = response;
  if (status > 200 && status < 299) {
    return {
      status: 'SUCCESS',
      data: body ? body : {}
    }
  }

  return {
    status: 'FAIL',
    message: 'some kind of mistake happened!'
  }
}

function failCallback () {
  return {
    status: 'FAIL',
    message: 'some kind of mistake happened!'
  }
}

export {
  callApi,
  successCallback,
  failCallback
};
