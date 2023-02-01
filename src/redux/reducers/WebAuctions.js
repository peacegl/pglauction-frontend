import {
  GET_WEB_AUCTIONS,
  SET_AUCTION_VIEW_TYPE,
} from '../../shared/constants/ActionTypes';

export const VIEW_TYPE = Object.freeze({LIST: 1, GRID: 2});
const initialState = {
  auctionsList: [],
  viewType: VIEW_TYPE.GRID,
};

const AuctionReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_WEB_AUCTIONS:
      return {
        ...state,
        auctionsList: action.payload,
      };
    case SET_AUCTION_VIEW_TYPE:
      return {
        ...state,
        viewType: action.payload,
      };
    default:
      return state;
  }
};
export default AuctionReducer;
