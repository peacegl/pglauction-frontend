import {combineReducers} from 'redux';
import Settings from './Setting';
import Auctions from './Auctions';
import AuctionItems from './AuctionItems';
import Common from './Common';
import Vehicles from './Vehicles';
import Users from './Users';
import Customers from './Customers';
import Categories from './Categories';
import Locations from './Locations';
import Roles from './Roles';
import Permissions from './Permissions';
import WebVehicles from './WebVehicles';

const reducers = combineReducers({
  settings: Settings,
  common: Common,
  users: Users,
  customers: Customers,
  categories: Categories,
  locations: Locations,
  vehicles: Vehicles,
  auctionItems: AuctionItems,
  auctions: Auctions,
  roles: Roles,
  permissions: Permissions,
  webVehicles: WebVehicles,
});
export default reducers;
