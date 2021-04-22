import {
  GET_ALBUMS,
} from '../constants';

export function getAlbums({ userId }) {

  return dispatch => dispatch({
    type: GET_ALBUMS,
    meta: {
      method: 'GET',
      serverName: 'media',
      endpoint:`albums/${userId}`,
    }
  });
}
