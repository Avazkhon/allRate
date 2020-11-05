import { combineReducers } from 'redux';
import auth from './auth';
import rate from './rate';
import selectRate from './selectRate';
import commonRate from './commonRate';
import purse from './purse';
import lang from './lang';
import users from './users';
import usersPages from './usersPages';
import subscriptions from './subscriptions';
import posts from './posts';
import withdrawalRequest from './withdrawalRequest';
import withdrawalRequestAdmin from './admin/withdrawalRequestAdmin';

export default combineReducers({
  withdrawalRequestAdmin,
  auth,
  rate,
  selectRate,
  commonRate,
  purse,
  lang,
  users,
  usersPages,
  subscriptions,
  posts,
  withdrawalRequest,
});
