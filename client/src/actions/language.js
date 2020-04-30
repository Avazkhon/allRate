import {
  CHANGE_LANG
} from '../constants';

export function changeLang (lang) {
  return dispatch => dispatch({
    type: CHANGE_LANG,
    lang
  })
};
