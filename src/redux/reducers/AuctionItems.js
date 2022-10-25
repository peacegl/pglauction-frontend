import {
  GET_AUCTION_ITEMS,
  SET_AUCTION_FILTER_DATA,
  SET_AUCTION_DATA,
  SET_AUCTION_VIEW_TYPE,
} from '../../shared/constants/ActionTypes';

export const VIEW_TYPE = Object.freeze({LIST: 1, GRID: 2});
const initialState = {
  auctionItemsList: [],
  viewType: VIEW_TYPE.LIST,
  currectAuction: null,
  filterData: {
    title: '',
    brand: [],
    ideaFor: [],
    discount: [],
    color: [],
    rating: [],
  },
};

const AuctionItemReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_AUCTION_ITEMS:
      return {
        ...state,
        auctionItemsList: action.payload,
      };
    case SET_AUCTION_VIEW_TYPE:
      return {
        ...state,
        viewType: action.payload,
      };

    case SET_AUCTION_FILTER_DATA:
      return {
        ...state,
        filterData: action.payload,
      };

    case SET_AUCTION_DATA:
      return {
        ...state,
        currectAuction: action.payload,
      };

    default:
      return state;
  }
};
export default AuctionItemReducer;
