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
};

export function createRequestReducer(state, action, reducerMap) {
  const reducer = reducerMap[action.status];
  return reducer ? reducer(state, action) : state;
};

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


export function changeStateBattery (_state, _action) {
  return createRequestReducer(_state, _action, {
    SEND: (state) => ({
      ...state,
      isFetching: true,
    }),
    SUCCESS: (state, action) => {
      const docs = !state.data.page || (action.response.page > state.data.page)
        ? action.response.docs : [];
      return {
        ...state,
        isFetching: false,
        error: null,
        data: {
          ...action.response,
          docs: [...state.data.docs, ...docs],
        },
      }
    },
    FAIL: (state, action) => ({
      ...state,
      error: action.error,
      isFetching: false,
    }),
  })
}

export function getMonth(index) {
  const month = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Ноябрь',
    'Декабрь',
  ];

  return month.find((month, i) => i === index);
}
