import {
  GET_VEHICLE_LIST,
  SET_VEHICLE_FILTER_DATA,
  ADD_NEW_VEHICLE,
} from '../../shared/constants/ActionTypes';

const initialState = {
  vehiclesData: {},
  filterData: {},
};

const AuctionItemReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_VEHICLE_LIST:
      return {
        ...state,
        vehiclesData: action.payload,
      };
    case ADD_NEW_VEHICLE:
      return {
        ...state,
        vehiclesData: {
          ...vehiclesData,
          total: vehiclesData.total + 1,
          data: [action.payload, ...vehiclesData.data],
        },
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
