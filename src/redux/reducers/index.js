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
import WebAuctions from './WebAuctions';

const reducers = combineReducers({
  settings: Settings,
  common: Common,
  users: Users,
  customers: Customers,
  locations: Locations,
  vehicles: Vehicles,
  webVehicles: WebVehicles,
  roles: Roles,
  permissions: Permissions,
  makes: Makes,
  models: Models,
  sales: Sales,
  auctions: Auctions,
  webAuctions: WebAuctions,
  auctionItems: AuctionItems,
});
export default reducers;
