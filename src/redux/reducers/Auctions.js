import {
  GET_AUCTIONS,
  SET_AUCTION_FILTER_DATA,
  SET_AUCTION_DATA,
  UPDATE_AUCTION,
  ADD_NEW_AUCTION,
  SET_AUCTION_VIEW_TYPE,
} from '../../shared/constants/ActionTypes';

export const VIEW_TYPE = Object.freeze({LIST: 1, GRID: 2});
const initialState = {
  auctionsList: [],
  currectAuction: null,
  filterData: {},
  viewType: VIEW_TYPE.GRID,
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

    case SET_AUCTION_VIEW_TYPE:
      return {
        ...state,
        viewType: action.payload,
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
        currectAuction: action.payload,
      };

    default:
      return state;
  }
};
export default AuctionReducer;
