import {
  GET_VEHICLE_LIST,
  GET_ALL_VEHICLE_LIST,
  SET_VEHICLE_FILTER_DATA,
  ADD_NEW_VEHICLE,
  UPDATE_VEHICLE,
  GET_VEHICLE_VIEW,
} from '../../shared/constants/ActionTypes';

const initialState = {
  vehiclesData: {},
  vehiclesExportData: {},
  filterData: {},
  vehicle: {},
};

const VeihcleReducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_VEHICLE_LIST:
      return {
        ...state,
        vehiclesData: action.payload,
      };

    case GET_ALL_VEHICLE_LIST:
      return {
        ...state,
        vehiclesExportData: action.payload,
      };

    case GET_VEHICLE_VIEW:
      return {
        ...state,
        vehicle: action.payload,
      };

    case ADD_NEW_VEHICLE:
      return {
        ...state,
        vehiclesData: {
          ...state.vehiclesData,
          total: state.vehiclesData.total + 1,
          data: [action.payload, ...state.vehiclesData.data],
        },
      };
    case UPDATE_VEHICLE:
      return {
        ...state,
        vehiclesData: {
          ...state.vehiclesData,
          data: state.vehiclesData.data.map((item) =>
            item.id == action.payload.id ? action.payload : item,
          ),
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
export default VeihcleReducers;
