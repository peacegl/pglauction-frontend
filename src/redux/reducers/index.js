import {combineReducers} from 'redux';
import Settings from './Setting';
import AuctionItems from './AuctionItems';
import Common from './Common';
import Vehicles from './Vehicles';
import Users from './Users';

const reducers = combineReducers({
  settings: Settings,
  common: Common,
  users: Users,
  vehicles: Vehicles,
  auction_items: AuctionItems,
});
export default reducers;
