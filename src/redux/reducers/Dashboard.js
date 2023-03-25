import {GET_VEHICLE_GRAPH} from 'shared/constants/ActionTypes';

const initialState = {
  vehiclesGraph: {},
};

const Dashboard = (state = initialState, action) => {
  switch (action.type) {
    case GET_VEHICLE_GRAPH:
      return {
        ...state,
        vehiclesGraph: action.payload,
      };
    default:
      return state;
  }
};
export default Dashboard;
