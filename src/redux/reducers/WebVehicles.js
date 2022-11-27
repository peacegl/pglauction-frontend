import {
  SET_VEHICLE_VIEW_TYPE,
  GET_WEB_VEHICLE_LIST,
  SET_VEHICLE_SEARCH,
} from '../../shared/constants/ActionTypes';

export const VIEW_TYPE = Object.freeze({LIST: 1, GRID: 2});
const initialState = {
  vehiclesData: {},
  search: '',
  viewType: VIEW_TYPE.GRID,
  filterData: {
    title: '',
    brand: [],
    ideaFor: [],
    discount: [],
    color: [],
    rating: [],
  },
};

const WebVehicleReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_WEB_VEHICLE_LIST:
      return {
        ...state,
        vehiclesData: action.payload,
      };
    case SET_VEHICLE_SEARCH:
      return {
        ...state,
        search: action.payload,
      };
    case SET_VEHICLE_VIEW_TYPE:
      return {
        ...state,
        viewType: action.payload,
      };
    default:
      return state;
  }
};
export default WebVehicleReducer;
