import {
  ADD_NEW_LOCATION,
  GET_LOCATION_LIST,
  SET_LOCATION_FILTER_DATA,
  UPDATE_LOCATION,
  GET_ALL_LOCATIONS_LIST,
  INCREMENT_TOTAL_LOCATION,
} from '../../shared/constants/ActionTypes';

const initialState = {
  locationData: {},
  filterData: {},
  locationsExportData: {},
};

const LocationReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LOCATION_LIST:
      return {
        ...state,
        locationData: action.payload,
      };
    case GET_ALL_LOCATIONS_LIST:
      return {
        ...state,
        locationsExportData: action.payload,
      };
    case ADD_NEW_LOCATION:
      return {
        ...state,
        locationData: {
          ...state.locationData,
          total: state.locationData.total + 1,
          data: [action.payload, ...state.locationData.data],
        },
      };
    case INCREMENT_TOTAL_LOCATION:
      return {
        ...state,
        locationData: {
          ...state.locationData,
          total: state.locationData.total + 1,
        },
      };
    case UPDATE_LOCATION:
      return {
        ...state,
        locationData: {
          ...state.locationData,
          data: state.locationData.data.map((item) =>
            item.id == action.payload.id ? action.payload : item,
          ),
        },
      };
    case SET_LOCATION_FILTER_DATA:
      return {
        ...state,
        filterData: action.payload,
      };
    default:
      return state;
  }
};
export default LocationReducer;
