import {
  CHANGE_LANG,
} from '../constants';

import {
  isBrowser,
} from 'utils';

function initLang () {
  const RU = 'RU';
  let lang  = isBrowser() && JSON.parse(localStorage.getItem('lang'));
  if (!lang) {
    localStorage.setItem('lang', JSON.stringify({ lang: RU }));
    return RU
  }
  return lang.lang;
};


const initState = {
  lang: initLang()
};

export default function (state = initState, action) {
  if (action.type === CHANGE_LANG) {
    localStorage.setItem('lang', JSON.stringify({ lang: action.lang}));
    return {
      ...state,
      lang: action.lang
    }
  }
  return state;
}
