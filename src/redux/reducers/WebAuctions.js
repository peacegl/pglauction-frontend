import {
  GET_WEB_AUCTIONS,
  SET_WEB_AUCTION_VIEW_TYPE,
  GET_UP_COMING_WEB_AUCTIONS,
  SET_UP_COMING_AUCTION_VIEW_TYPE,
} from '../../shared/constants/ActionTypes';

export const VIEW_TYPE = Object.freeze({LIST: 1, GRID: 2});
const initialState = {
  auctionsList: [],
  auctionsUpComingList: [],
  viewType: VIEW_TYPE.GRID,
  viewUpType: VIEW_TYPE.GRID,
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
    case SET_WEB_AUCTION_VIEW_TYPE:
      return {
        ...state,
        viewType: action.payload,
      };
    case SET_UP_COMING_AUCTION_VIEW_TYPE:
      return {
        ...state,
        viewUpType: action.payload,
      };
    default:
      return state;
  }
};
export default AuctionReducer;
