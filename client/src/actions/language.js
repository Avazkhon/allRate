import {
  CHANGE_LANG,
  GET_LANG,
} from '../constants';

export function changeLang (lang) {
  return dispatch => dispatch({
    type: CHANGE_LANG,
    meta: {
      method: "POST",
      endpoint: "lang",
      data: { lang },
    }
  })
}

export function getLang () {
  return dispatch => dispatch({
    type: GET_LANG,
    meta: {
      method: "GET",
      endpoint: "lang",
    }
  })
}
