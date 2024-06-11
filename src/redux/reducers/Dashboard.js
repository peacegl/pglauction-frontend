import {
  GET_VEHICLE_GRAPH,
  GET_LATEST_SOLD_VEHICLES,
} from 'shared/constants/ActionTypes';

const initialState = {
  vehiclesGraph: {},
  latestSoldVehicles: [],
};

const Dashboard = (state = initialState, action) => {
  switch (action.type) {
    case GET_VEHICLE_GRAPH:
      return {
        ...state,
        vehiclesGraph: action.payload,
      };
    case GET_LATEST_SOLD_VEHICLES:
      return {
        ...state,
        latestSoldVehicles: action.payload,
      };
    default:
      return state;
  }
};
export default Dashboard;
