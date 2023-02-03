import {
  GET_AUCTION_ITEMS,
  GET_CATEGORIES,
  SET_AUCTION_ITEM_FILTER_DATA,
  SET_AUCTION_ITEM_DATA,
  SET_AUCTION_ITEM_VIEW_TYPE,
  UPDATE_AUCTION_ITEM,
} from '../../shared/constants/ActionTypes';

export const VIEW_TYPE = Object.freeze({LIST: 1, GRID: 2});
const initialState = {
  auctionItemsList: [],
  categories: [],
  viewType: VIEW_TYPE.GRID,
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
    case GET_AUCTION_ITEMS:
      return {
        ...state,
        auctionItemsList: action.payload,
      };
    case UPDATE_AUCTION_ITEM:
      return {
        ...state,
        auctionItemsList: {
          ...state.auctionItemsList,
          data: state.auctionItemsList.data.map((item) =>
            item.id == action.payload.id ? action.payload : item,
          ),
        },
      };
    case GET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };
    case SET_AUCTION_ITEM_VIEW_TYPE:
      return {
        ...state,
        viewType: action.payload,
      };

    case SET_AUCTION_ITEM_FILTER_DATA:
      return {
        ...state,
        filterData: action.payload,
      };

    case SET_AUCTION_ITEM_DATA:
      return {
        ...state,
        currectAuction: action.payload,
      };

    default:
      return state;
  }
};
export default AuctionReducer;
