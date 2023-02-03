import {
  GET_WEB_AUCTIONS,
  SET_WEB_AUCTION_VIEW_TYPE,
  GET_UP_COMING_WEB_AUCTIONS,
  GET_WEB_AUCTION_ITEMS,
} from '../../shared/constants/ActionTypes';

export const VIEW_TYPE = Object.freeze({LIST: 1, GRID: 2});
const initialState = {
  auctionsList: {},
  auctionsUpComingList: {},
  auction: {},
  viewType: VIEW_TYPE.GRID,
};

const AuctionReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_WEB_AUCTIONS:
      return {
        ...state,
        auctionsList: action.payload,
      };
    case GET_UP_COMING_WEB_AUCTIONS:
      return {
        ...state,
        auctionsUpComingList: action.payload,
      };
    case GET_WEB_AUCTION_ITEMS:
      return {
        ...state,
        auction: action.payload,
      };
    case SET_WEB_AUCTION_VIEW_TYPE:
      return {
        ...state,
        viewType: action.payload,
      };
    default:
      return state;
  }
};
export default AuctionReducer;
