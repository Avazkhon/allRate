import { combineReducers } from 'redux';
import auth from './auth'
import rate from './rate'

export default combineReducers({
  auth,
  rate,
})
