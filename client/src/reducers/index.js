import { combineReducers } from 'redux';
import auth from './auth';
import rate from './rate';
import selectRate from './selectRate';
import commonRate from './commonRate';
import comments from './comments';
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
import categories from './categories';
import albums from './albums';

export default combineReducers({
  albums,
  userPage,
  withdrawalRequestAdmin,
  auth,
  rate,
  blocks,
  selectRate,
  commonRate,
  comments,
  purse,
  lang,
  users,
  usersPages,
  subscriptions,
  posts,
  postPage,
  withdrawalRequest,
  categories,
});
