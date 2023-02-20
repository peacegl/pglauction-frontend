import {
  GET_WEB_AUCTIONS,
  SET_WEB_AUCTION_VIEW_TYPE,
  GET_UP_COMING_WEB_AUCTIONS,
  GET_WEB_AUCTION_ITEMS,
  LOADING_VEHICLE,
  ADD_TODAY_AUCTION,
  INCREMENT_TOTAL_NEW_AUCTION_ITEM,
  ADD_UPCOMING_AUCTION,
  INCREMENT_TOTAL_UPCOMING_AUCTION_ITEM,
} from '../../shared/constants/ActionTypes';

export const VIEW_TYPE = Object.freeze({LIST: 1, GRID: 2});
const initialState = {
  auctionsList: {},
  auctionsUpComingList: {},
  auction: {},
  viewType: VIEW_TYPE.GRID,
  loading: false,
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
    case LOADING_VEHICLE:
      return {
        ...state,
        loading: action.payload,
      };
    case ADD_TODAY_AUCTION:
      return {
        ...state,
        auctionsList: {
          ...state.auctionsList,
          total: state.auctionsList.total + 1,
          data: [action.payload, ...state.auctionsList.data],
        },
      };
    case INCREMENT_TOTAL_NEW_AUCTION_ITEM:
      return {
        ...state,
        auctionsList: {
          ...state.auctionsList,
          total: state.auctionsList.total + 1,
        },
      };

    case ADD_UPCOMING_AUCTION:
      return {
        ...state,
        auctionsUpComingList: {
          ...state.auctionsUpComingList,
          total: state.auctionsUpComingList.total + 1,
          data: [action.payload, ...state.auctionsUpComingList.data],
        },
      };
    case INCREMENT_TOTAL_UPCOMING_AUCTION_ITEM:
      return {
        ...state,
        auctionsUpComingList: {
          ...state.auctionsUpComingList,
          total: state.auctionsUpComingList.total + 1,
        },
      };
    default:
      return state;
  }
};
export default AuctionReducer;
