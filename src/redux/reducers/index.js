import {combineReducers} from 'redux';
import Settings from './Setting';
import AuctionItems from './AuctionItems';
import Common from './Common';
import Vehicles from './Vehicles';
import Users from './Users';
import Customers from './Customers';
import Categories from './Categories';
import Locations from './Locations';

const reducers = combineReducers({
  settings: Settings,
  common: Common,
  users: Users,
  customers: Customers,
  categories: Categories,
  locations: Locations,
  vehicles: Vehicles,
  auction_items: AuctionItems,
});
export default reducers;
