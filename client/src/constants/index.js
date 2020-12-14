export const GET_USER_BY_ID = 'GET_USER_BY_ID';
export const LOG_IN = 'LOG_IN';
export const REGISTRATION_USER = 'REGISTRATION_USER';
export const LOG_AUT = 'LOG_AUT';
export const CREATE_NEW_USER = 'CREATE_NEW_USER';
export const CHANGE_RATING_USER = 'CHANGE_RATING_USER';
export const POST_UPDATE_USERS_BY_ID = 'POST_UPDATE_USERS_BY_ID';

export const GET_USERS_PAGINATE = 'GET_USERS_PAGINATE';
export const GET_USERS_BY_IDS = 'GET_USERS_BY_IDS';
export const GET_USER_FOR_PAGE_BY_ID = 'GET_USER_FOR_PAGE_BY_ID';

export const CREATE_NEW_RATE = 'CREATE_NEW_RATE';
export const GET_RATES = 'GET_RATES';
export const GET_RATES_PAGE = 'GET_RATES_PAGE';
export const GET_RATE_BY_ID = 'GET_RATE_BY_ID';
export const PUT_RATE = 'PUT_RATE';
export const GET_COMMON_RATES = 'GET_COMMON_RATES';

export const PUT_RATE_LIVE = 'PUT_RATE_LIVE';
export const PUT_RATE_SELECT_VICTORY = 'PUT_RATE_SELECT_VICTORY';

export const GET_PURSE = 'GET_PURSE';

export const POST_INVOICE = 'POST_INVOICE';

export const CHANGE_LANG = 'CHANGE_LANG';
export const GET_LANG = 'GET_LANG';

export const ADD_SUBSCRIPTION = 'ADD_SUBSCRIPTION';
export const GET_SUBSCRIPTION = 'GET_SUBSCRIPTION';
export const DELETE_SUBSCRIPTION = 'DELETE_SUBSCRIPTION';

export const CREATE_POST = 'CREATE_POST';
export const ADD_COUNT_VIEWS_POST = 'ADD_COUNT_VIEWS_POST';
export const CHANGE_RATING_POST = 'CHANGE_RATING_POST';
export const GET_POSTS_PAGE = 'GET_POSTS_PAGE';
export const GET_POST_BY_ID = 'GET_POST_BY_ID';

export const CHANGE_RATING_RATE = 'CHANGE_RATING_RATE';
export const ADD_COUNT_VIEWS_RATE = 'ADD_COUNT_VIEWS_RATE';

export const CHANGE_IMG = 'CHANGE_IMG';

export const GET_WITHDRAWALR_REQUEST = 'GET_WITHDRAWALR_REQUEST';
export const POST_WITHDRAWALR_REQUEST = 'POST_WITHDRAWALR_REQUEST';
export const PATCH_WITHDRAWALR_REQUEST = 'PATCH_WITHDRAWALR_REQUEST';

export const GET_WITHDRAWALR_REQUEST_ADMIN = 'GET_WITHDRAWALR_REQUEST_ADMIN';
export const PATCH_WITHDRAWALR_REQUEST_ADMIN = 'PATCH_WITHDRAWALR_REQUEST_ADMIN';

export const POSRT_PASSWORD_RECOVERY = 'POSRT_PASSWORD_RECOVERY';
export const PUT_PASSWORD_RECOVERY = 'PUT_PASSWORD_RECOVERY';

export const POST_BLOCK = 'POST_BLOCK';
export const GET_BLOCK_BY_ID = 'GET_BLOCK_BY_ID';

export const basisForPayment = {
  accountReplenishment: 'accountReplenishment', // Пополнение счета
  withdrawal: 'withdrawal', // вывод
  makeRate: 'makeRate', // makeRate
  win: 'win', // выиграть
  percentage: 'percentage', // процент
  stalemateSituation: 'stalemateSituation', // патовая ситуация
  returnMoney: 'returnMoney', // вернуть деньги
  leftovers: 'leftovers', // вернуть деньги
};

export const rateStatusLive = {
  new: 'new',
  active: 'active',
  finish: 'finish',
  archive: 'archive',
  in_progress: 'in_progress',
}

export const formatDateTime = 'YYYY.MM.DD HH:mm';

export const typeBlock = {
  boolean: 'boolean',
  total: 'total'
}
