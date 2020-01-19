export const isBrowser = () => typeof window != 'undefined';
export const getDataUserFromLocalStoragr = () => {
  return isBrowser() && JSON.parse(localStorage.getItem('userData'));
}
