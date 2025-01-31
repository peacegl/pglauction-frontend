import {combineReducers} from 'redux';
import Settings from './Setting';
import Auctions from './Auctions';
import AuctionItems from './AuctionItems';
import Common from './Common';
import Vehicles from './Vehicles';
import Users from './Users';
import Customers from './Customers';
import Locations from './Locations';
import Roles from './Roles';
import Permissions from './Permissions';
import WebVehicles from './WebVehicles';
import Makes from './Makes';
import Models from './Models';
import Sales from './Sales';

const reducers = combineReducers({
  settings: Settings,
  common: Common,
  users: Users,
  customers: Customers,
  locations: Locations,
  vehicles: Vehicles,
  auctionItems: AuctionItems,
  auctions: Auctions,
  roles: Roles,
  permissions: Permissions,
  webVehicles: WebVehicles,
  makes: Makes,
  models: Models,
  sales: Sales,
});
export default reducers;
