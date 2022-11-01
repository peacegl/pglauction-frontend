import {
  GET_LOCATION_LIST,
  SET_LOCATION_FILTER_DATA,
} from '../../shared/constants/ActionTypes';

const initialState = {
  locationData: {},
  filterData: {},
};

const LocationReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LOCATION_LIST:
      return {
        ...state,
        locationData: action.payload,
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
