export const isBrowser = () => typeof window != 'undefined';
export const getDataUserFromLocalStorag = () => {
  return isBrowser() && JSON.parse(localStorage.getItem('userData'));
}

export const deleteDataUserFromLocalStorag = () => {
  return isBrowser() && localStorage.removeItem('userData');
}

export const setDataUserFromLocalStorag = (data) => {
  return isBrowser() && localStorage.setItem('userData', JSON.stringify(data));
}

export const changeDataUserToLocalStorage = (data)  => {
  if (isBrowser()) {
    const dataUser = localStorage.getItem('userData');
    if (dataUser && !data) {
      localStorage.removeItem('userData');
    } else {
      localStorage.setItem('userData', JSON.stringify(data));
    }
  }
}

export const isFunction = (fn) => (typeof fn === 'function');

export function createReducer(initialState, reducerMap) {
  return (state, action) => {
    if (!state) state = initialState;

    const reducer = reducerMap[action.type];

    return reducer ? reducer({ ...state}, action) : state;
  };
}

export function createRequestReducer(state, action, reducerMap) {
  const reducer = reducerMap[action.status];
  return reducer ? reducer(state, action) : state;
}

export function changeState (_state, _action) {
  return createRequestReducer(_state, _action, {
    SEND: (state, action) => ({
      ...state,
      isFetching: true,
    }),
    SUCCESS: (state, action) => ({
      ...state,
      error: null,
      data: action.response,
      isFetching: false,
    }),
    FAIL: (state, action) => ({
      ...state,
      error: action.error,
      isFetching: false,
    }),
  })
}

export const changeStateNewAndOld = (state, response) => {
  let data = {};
  if (response.page === 1) {
    data = {
      ...response,
      docs: response.docs,
    }
  } else {
    const docs = !state.data.page || (response.page > state.data.page)
      ? response.docs : [];
    data = {
      ...response,
      docs: [...state.data.docs, ...docs],
    }
  }
  return data;
}


export function changeStateBattery (_state, _action) {
  return createRequestReducer(_state, _action, {
    SEND: (state) => ({
      ...state,
      isFetching: true,
    }),
    SUCCESS: (state, action) => {
      return {
        ...state,
        isFetching: false,
        error: null,
        data: changeStateNewAndOld(state, action.response),
      }
    },
    FAIL: (state, action) => ({
      ...state,
      error: action.error,
      isFetching: false,
    }),
  })
}

export function getPramsAndTranformToQueryUrl (params) {
  let allQuery = '?';
  const keys = Object.keys(params);
  keys.forEach((currentValueExternal, keyExternal, arrExternal) => {
    if (Array.isArray(params[currentValueExternal])) {
      params[currentValueExternal].forEach((currentValueInner, keyInner, arrInner) => {
        const isEnd = (() => {
          if  (arrInner.length !== keyInner + 1) {
            return '&';
          }  else if ((arrExternal.length === keyExternal + 1) && arrInner.length === keyInner + 1) {
            return '';
          } else {
            return '';
          }
        })();

        const query = `${currentValueExternal}=${currentValueInner}${isEnd}`;
        allQuery = allQuery + query;
      })
    } else {
      const query = `${currentValueExternal}=${params[currentValueExternal]}${(arrExternal.length !== keyExternal + 1) ? '&' : ''}`;
      allQuery = allQuery + query;
    }
  });

  return allQuery;
}


export function checkLength (string, warning, lengthMin, lengthMax, isNotValidArray) {
  let message = warning || 'Обезательное поле';
  if (string.length < lengthMin) {
    message += `(минимальная длина ${lengthMin})`;
    isNotValidArray.push(false);
  } else if (lengthMax && string.length > lengthMax) {
    isNotValidArray.push(false);
    message += `(максимальная длина ${lengthMax})`;
  } else {
    message = '';
  }
  return message;
}
