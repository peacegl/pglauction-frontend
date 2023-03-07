import {
  GET_AUCTIONS,
  SET_AUCTION_FILTER_DATA,
  SET_AUCTION_DATA,
  UPDATE_AUCTION,
  ADD_NEW_AUCTION,
  INCREMENT_TOTAL_AUCTION,
  GET_VEHICLE_AUCTIONS,
  GET_AUCTION_ITEMS,
  GET_AUCTION_ITEM_BID,
  GET_AUCTION_ITEM_BID_EMPTY,
  GET_AUCTION_ITEM_BID_IS_ACCEPTED,
} from '../../shared/constants/ActionTypes';

export const VIEW_TYPE = Object.freeze({LIST: 1, GRID: 2});
const initialState = {
  auctionsList: [],
  auction: {},
  filterData: {},
  auctionItemList: [],
  auctionItemsData: {},
  auctionItemBid: {},
};

const AuctionReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_AUCTIONS:
      return {
        ...state,
        auctionsList: action.payload,
      };
    case ADD_NEW_AUCTION:
      return {
        ...state,
        auctionsList: {
          ...state.auctionsList,
          total: state.auctionsList.total + 1,
          data: [action.payload, ...state.auctionsList.data],
        },
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
    case SET_AUCTION_FILTER_DATA:
      return {
        ...state,
        filterData: action.payload,
      };

    case SET_AUCTION_DATA:
      return {
        ...state,
        auction: action.payload,
      };

    case INCREMENT_TOTAL_AUCTION:
      return {
        ...state,
        auctionsList: {
          ...state.auctionsList,
          total: state.auctionsList.total + 1,
        },
      };

    case GET_VEHICLE_AUCTIONS:
      return {
        ...state,
        auctionItemList: action.payload,
      };
    case GET_AUCTION_ITEMS:
      return {
        ...state,
        auctionItemsData: action.payload,
      };
    case GET_AUCTION_ITEM_BID:
      let prevData = state.auctionItemBid?.data
        ? state.auctionItemBid.data
        : [];
      return {
        ...state,
        auctionItemBid: {
          ...action.payload,
          data: [...prevData, ...action.payload.data],
          // data: action.payload.data,
          hasMore:
            action.payload.data.length == 10 &&
            action.payload.data.length != undefined
              ? true
              : false,
        },
      };

    case GET_AUCTION_ITEM_BID_EMPTY:
      return {
        ...state,
        auctionItemBid: {
          ...action.payload,
          data: [],
        },
      };

    case GET_AUCTION_ITEM_BID_IS_ACCEPTED:
      return {
        ...state,
        auctionsAcceptedID: action.payload,
      };

    default:
      return state;
  }
};
export default AuctionReducer;
