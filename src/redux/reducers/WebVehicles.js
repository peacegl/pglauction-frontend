import {
  SET_VEHICLE_VIEW_TYPE,
  GET_WEB_VEHICLE_LIST,
  SET_VEHICLE_SEARCH,
  GET_WEB_VEHICLE_VIEW,
  GET_WEB_SIMILAR_VEHICLE,
  SET_WEB_VEHICLE_FILTER_DATA,
  GET_FEATURED_VEHICLE_LIST,
  GET_BEST_SELLING_VEHICLE_LIST,
  GET_RECENTLY_ADDED_VEHICLE_LIST,
  GET_MY_WATCH_LIST,
  GET_MY_PURCHASE_LIST,
  EMPTY_WEB_VEHICLE_LIST,
} from '../../shared/constants/ActionTypes';

export const VIEW_TYPE = Object.freeze({LIST: 1, GRID: 2});
const initialState = {
  vehiclesData: {},
  myWatchList: {},
  myPurchaseList: {},
  similarVehicles: [],
  vehicle: {},
  search: '',
  viewType: VIEW_TYPE.GRID,
  featuredVehicles: [],
  bestSellingVehicles: [],
  recentlyAddedVehicles: [],
  filterData: {
    newly_added: {
      newly_added_duration: 24,
      newly_added: 0,
    },
    'between@@price': [0, 100000],
    'between@@odometer': [0, 250000],
    'between@@year': [1995, new Date().getFullYear()],
    make: [],
    model: [],
    engine_type: [],
    transmission: [],
    fuel: [],
    cylinder: [],
    interior_color: [],
    exterior_color: [],
    document_type: [],
    body_style: [],
    feature: [],
    drive_type: [],
    status: [],
    keys: [],
    test_drive: [],
    location_id: [],
    category_id: [],
  },
};

const WebVehicleReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_WEB_VEHICLE_LIST:
      return {
        ...state,
        vehiclesData: action.payload,
      };
    case EMPTY_WEB_VEHICLE_LIST:
      return {
        ...state,
        vehiclesData: {
          ...state.vehiclesData,
          data: [],
        },
      };
    case GET_WEB_VEHICLE_VIEW:
      return {
        ...state,
        vehicle: action.payload,
      };
    case GET_WEB_SIMILAR_VEHICLE:
      return {
        ...state,
        similarVehicles: action.payload,
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
    case SET_WEB_VEHICLE_FILTER_DATA:
      return {
        ...state,
        filterData: action.payload,
      };
    case GET_FEATURED_VEHICLE_LIST:
      return {
        ...state,
        featuredVehicles: action.payload,
      };
    case GET_BEST_SELLING_VEHICLE_LIST:
      return {
        ...state,
        bestSellingVehicles: action.payload,
      };
    case GET_RECENTLY_ADDED_VEHICLE_LIST:
      return {
        ...state,
        recentlyAddedVehicles: action.payload,
      };
    case GET_MY_WATCH_LIST:
      return {
        ...state,
        myWatchList: action.payload,
      };
    case GET_MY_PURCHASE_LIST:
      return {
        ...state,
        myPurchaseList: action.payload,
      };
    default:
      return state;
  }
};
export default WebVehicleReducer;
