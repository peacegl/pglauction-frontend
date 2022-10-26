import {combineReducers} from 'redux';
import Settings from './Setting';
import AuctionItems from './AuctionItems';
import Common from './Common';

const reducers = combineReducers({
  settings: Settings,
  common: Common,
  auction_items: AuctionItems,
});
export default reducers;
