export const isBrowser = () => typeof window != 'undefined';
export const getDataUserFromLocalStoragr = () => {
  return isBrowser() && JSON.parse(localStorage.getItem('userData'));
}

export const deleteDataUserFromLocalStoragr = () => {
  return isBrowser() && localStorage.removeItem('userData');
}

export const setDataUserFromLocalStoragr = (data) => {
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
