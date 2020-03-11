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
