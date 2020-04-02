import { combineReducers } from 'redux';
import auth from './auth';
import rate from './rate';
import commonRate from './commonRate';
import purse from './purse';

export default combineReducers({
  auth,
  rate,
  commonRate,
  purse,
})
