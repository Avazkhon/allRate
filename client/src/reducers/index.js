import { combineReducers } from 'redux';
import auth from './auth';
import rate from './rate';
import selectRate from './selectRate';
import commonRate from './commonRate';
import purse from './purse';
import lang from './lang';
import users from './users';
import subscriptions from './subscriptions';
import myList from './myList';
import posts from './posts';

export default combineReducers({
  auth,
  rate,
  selectRate,
  commonRate,
  purse,
  lang,
  users,
  subscriptions,
  myList,
  posts,
});
