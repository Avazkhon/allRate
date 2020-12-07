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
import postPage from './postPage';
import withdrawalRequest from './withdrawalRequest';
import withdrawalRequestAdmin from './admin/withdrawalRequestAdmin';
import userPage from './userPage';
import blocks from './blocks';

export default combineReducers({
  userPage,
  withdrawalRequestAdmin,
  auth,
  rate,
  blocks,
  selectRate,
  commonRate,
  purse,
  lang,
  users,
  usersPages,
  subscriptions,
  posts,
  postPage,
  withdrawalRequest,
});
