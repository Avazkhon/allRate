import cookie from 'cookie';
import 'isomorphic-fetch';

const API_ROOT = '/';

function checkHttpStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;

  } else {
    let error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

function callApi(endpoint, method, data, token, apiRoot=API_ROOT) {
  const fullUrl = (endpoint.indexOf(apiRoot) === -1) ? apiRoot + endpoint : endpoint;
  let requestOptions = {
    method: method,
    credentials: 'same-origin',
    headers: {
      Accept: 'application/json'
    },
    credentials: "include",
  };

  if (token) {
    requestOptions.headers['X-Authorization'] = `JWT ${token}`;
  }

  if (data) {
    requestOptions.headers['Content-Type'] = 'application/json';
    requestOptions.body = JSON.stringify(data);
  }

  return fetch('http://localhost:8080/'+endpoint, requestOptions)
    .then(response => {
      const { status, ok } = response;

      if (ok && method == 'DELETE') {
        return {};
      }

      return response.json().then(json => {
        if (!ok) {
          throw { json, status };

        } else {
          return { json, status };
        }
      });
    });
}

export const CALL_API = Symbol('Call API');

export default store => next => action => {
  if (!action) {
    return;
  }

  const callAPI = action[CALL_API];

  if (typeof callAPI === 'undefined') {
    return next(action);
  }

  let { endpoint } = callAPI;
  const { types, method, data } = callAPI;

  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState());
  }

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.');
  }

  if (typeof method !== 'string') {
    throw new Error('Specify a string method.');
  }

  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.');
  }

  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.');
  }

  let apiRoot = callAPI.apiRoot;
  if (!apiRoot) apiRoot = API_ROOT;

  function actionWith(actionData) {
    const finalAction = Object.assign({}, action, actionData);
    delete finalAction[CALL_API];
    return finalAction;
  }

  const [requestType, successType, failureType] = types;
  // next(actionWith({ type: requestType }));

  let token = store.getState().auth.token;
  return callApi(endpoint, method, data, token, apiRoot).then(
    response => {
      return next(actionWith({
        type: successType,
        response: response.json
      }));
    },

    error => {
      if (error.status === 403 || error.status === 401) {
        // browserHistory.push('/login/');
        console.log('is not login');
      }

      return next(actionWith({
        type: failureType,
        error: error.json || 'Something bad happened'
      }));
    });
};
