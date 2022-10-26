import {combineReducers} from 'redux';
import Settings from './Setting';
import Common from './Common';
import users from './users';

const reducers = combineReducers({
  settings: Settings,
  common: Common,
  users: users,
});
export default reducers;
