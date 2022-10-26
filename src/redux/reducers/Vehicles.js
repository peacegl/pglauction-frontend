import {
  GET_VEHICLE_LIST,
  SET_VEHICLE_FILTER_DATA,
} from '../../shared/constants/ActionTypes';

const initialState = {
  vehiclesList: [],
  filterData: {},
};

const AuctionItemReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_VEHICLE_LIST:
      return {
        ...state,
        vehiclesList: action.payload,
      };
    case SET_VEHICLE_FILTER_DATA:
      return {
        ...state,
        filterData: action.payload,
      };
    default:
      return state;
  }
};
export default AuctionItemReducer;
