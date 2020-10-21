import cookie from 'cookie';
import 'isomorphic-fetch';
import queryString from 'query-string';
import uuidV4 from 'uuid/v4';


function callApi(endpoint, method, data, queryParams, options) {
  let fullUrl = options.apiRoot + endpoint;
  const requestOptions = {
    method,
    // credentials: 'same-origin',
    headers: Object.assign({}, {}, {
      Accept: 'application/json'
    }),
    credentials: 'include',
  };


  if (queryParams && typeof queryParams === 'object') {
    if (fullUrl.indexOf('/?') === -1) {
      fullUrl += `?${queryString.stringify(queryParams)}`;
    } else {
      fullUrl += `&${queryString.stringify(queryParams)}`;
    }
  }

  if (method === 'GET' && data) {
    console.error('Do not use data param in GET request');
  }

  if (data) {
    requestOptions.headers['Content-Type'] = 'application/json';
    requestOptions.body = JSON.stringify(data);
  }

  return fetch(fullUrl, requestOptions)
    .then((response) => {
      const { status, ok, headers } = response;

      return response.json()
      .then((json) => {
        if (!ok) {
          throw { json, status };
        } else {
          return { json, status, headers };
        }
      })
      .catch((error) => {
        console.log('e', error);
        if (!ok) {
          throw error;
        } else {
          return { status };
        }
      });

    })
    .catch((error) => {
      throw error;
    })
}

function uploadFiles(endpoint, files, field, options) {
  if (!files) {
    return undefined;
  }

  const fullUrl = options.apiRoot + endpoint;
  const requestOptions = {
    method: 'POST',
    credentials: 'include',
    headers: {
      'X-CSRFToken': options.csrfToken
    }
  };

  if (options.cookie) {
    requestOptions.headers.Cookie = options.cookie;
  }

  if (!field) {
    field = 'photo';
  }

  return Promise.all(files.map((file) => {
    const formData = new FormData();
    formData.append(field, file, file.filename);

    const options = Object.assign({}, requestOptions, { body: formData });

    return fetch(fullUrl, options).then((response) => {
      const { status, ok, headers } = response;
      const result = { status };

      let promise;
      if (headers.get('Content-Type') && headers.get('Content-Type').indexOf('application/json') !== -1) {
        promise = response.json().then((json) => {
          result.json = json;
        });
      } else {
        promise = response.text().then((text) => {
          result.text = text;
        });
      }

      return promise.then(() => {
        if (!ok) throw result;
        else return result;
      });
    });
  }));
}

function makeOptions(req, store, timezone, date) {
  let headers = {};

  if (req) {
    headers = req.headers;
  }

  if (timezone) {
    headers['x-user-timezone'] = new Date().getTimezoneOffset();
  }
  if (date) {
    headers['x-user-date'] = `${new Date(new Date().toString().split('GMT')[0]+' UTC').toISOString().split('.')[0]}`;
  }

  return {
    apiRoot: process.env.NODE_ENV === 'production' ? `http://facebetting.ru/api/` : 'http://localhost:8080/api/',
    headers
  };
}

function actionWith(action, status, obj) {
  if (!obj) obj = {};
  return Object.assign({}, action, { status }, obj);
}

export default function createApiMiddleware(req) {
  return store => next => (action) => {
    if (!action) return undefined;

    if (typeof action.meta === 'undefined' || typeof action.meta.endpoint === 'undefined') {
      return next(action);
    }

    action = {
      ...action,
      signature: uuidV4()
    };

    const { meta } = action;
    const { method, endpoint, data, files, field, queryParams, timezone, date } = meta;

    const options = makeOptions(req, store);

    const successCallback = (data) => {
      let { json, status, headers } = data;

      if (Array.isArray(data)) {
        json = data.map(el => el.json);
        status = data.map(el => el.status);
      }

      return next(actionWith(action, 'SUCCESS', {
        response: json,
        statusCode: status,
        headers
      }));
    };

    const failCallback = (data) => {
      let { json, status } = data;
      const { text } = data;

      if (Array.isArray(data)) {
        json = data.map(el => el.json);
        status = data.map(el => el.status);
      }

      return next(actionWith(action, 'FAIL', {
        error: json || text || 'Something bad happened',
        statusCode: status
      }));
    };

    if (!options) {
      throw Error('Can\'t send API request');
    }

    next(actionWith(action, 'SEND'));

    if (files) {
      return uploadFiles(endpoint, files, field, options).then(successCallback, failCallback);
    }

    return callApi(endpoint, method, data, queryParams, options).then(successCallback, failCallback);
  };
}
