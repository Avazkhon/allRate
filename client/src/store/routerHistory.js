import { createBrowserHistory, createMemoryHistory } from 'history'
import { isBrowser } from 'utils';

const basename = (isBrowser() && window.regionBaseName) || '';

const history = isBrowser()
  ? createBrowserHistory({ basename, })
  : createMemoryHistory({ basename, });

console.log('routerHistory is: ', isBrowser() ? 'createBrowserHistory' : 'createMemoryHistory');

export default history;
