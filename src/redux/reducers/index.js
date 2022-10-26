import {combineReducers} from 'redux';
import Settings from './Setting';
import AuctionItems from './AuctionItems';
import Common from './Common';
import users from './users';

const reducers = combineReducers({
  settings: Settings,
  common: Common,
  users: users,
  auction_items: AuctionItems,
});
export default reducers;
