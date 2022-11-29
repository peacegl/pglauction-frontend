import {
  SET_VEHICLE_VIEW_TYPE,
  GET_WEB_VEHICLE_LIST,
  SET_VEHICLE_SEARCH,
  GET_WEB_VEHICLE_VIEW,
} from '../../shared/constants/ActionTypes';

export const VIEW_TYPE = Object.freeze({LIST: 1, GRID: 2});
const initialState = {
  vehiclesData: {},
  vehicle: {},
  search: '',
  viewType: VIEW_TYPE.GRID,
  filterData: {
    newly_added: {
      newly_added_duration: '24',
      newly_added: false,
    },
    odometer: [],
    year: [],
    make: [],
    model: [],
    engine_type: [],
    transmission: [],
    fuel: [],
    cylinders: [],
    price: [],
    interior_color: [],
    exterior_color: [],
    document_type: [],
    body_style: [],
    drive_type: [],
    status: [],
    keys: 'both',
    test_drive: 'both',
    is_featured: 'both',
    is_best_selling: 'both',
    location: [],
    category: [],
  },
};

const WebVehicleReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_WEB_VEHICLE_LIST:
      return {
        ...state,
        vehiclesData: action.payload,
      };
    case GET_WEB_VEHICLE_VIEW:
      return {
        ...state,
        vehicle: action.payload,
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
