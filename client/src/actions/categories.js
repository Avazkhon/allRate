import {
  GET_CATEGORIES
} from '../constants';

export function getCategories () {
  return dispatch => dispatch({
    type: GET_CATEGORIES,
    meta: {
      method: "GET",
      endpoint: 'categories'
    }
  })
}
