import {
  GET_AUCTIONS,
  GET_WEB_AUCTIONS,
  GET_CATEGORIES,
  SET_AUCTION_FILTER_DATA,
  SET_AUCTION_DATA,
  SET_AUCTION_VIEW_TYPE,
  UPDATE_AUCTION,
} from '../../shared/constants/ActionTypes';

export const VIEW_TYPE = Object.freeze({LIST: 1, GRID: 2});
const initialState = {
  auctionsList: [],
  webAuctionsList: [],
  categories: [],
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

const AuctionReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_AUCTIONS:
      return {
        ...state,
        auctionsList: action.payload,
      };
    case GET_WEB_AUCTIONS:
      return {
        ...state,
        webAuctionsList: action.payload,
      };
    case UPDATE_AUCTION:
      return {
        ...state,
        auctionsList: {
          ...state.auctionsList,
          data: state.auctionsList.data.map((item) =>
            item.id == action.payload.id ? action.payload : item,
          ),
        },
      };
    case GET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
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
export default AuctionReducer;
