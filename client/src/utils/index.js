export const isBrowser = () => typeof window != 'undefined';
export const getDataUserFromLocalStoragr = () => {
  return JSON.parse(localStorage.getItem('userData'));
}
