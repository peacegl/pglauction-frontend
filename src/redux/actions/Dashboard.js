import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  GET_VEHICLE_GRAPH,
  GET_LATEST_SOLD_VEHICLES,
} from 'shared/constants/ActionTypes';

import {appIntl} from '../../@crema/utility/helper/Utils';
import jwtAxios from '@crema/services/auth/jwt-auth';

export const onGetVehicleGraph = () => {
  return async (dispatch) => {
    const {messages} = appIntl();
    dispatch({type: FETCH_START});
    try {
      const res = await jwtAxios.get('/vehicles_list/get_graph');
      if (res.status === 200 && res.data.result) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: GET_VEHICLE_GRAPH, payload: res.data.data});
      } else {
        dispatch({
          type: FETCH_ERROR,
          payload: messages['message.somethingWentWrong'],
        });
        dispatch({type: GET_VEHICLE_GRAPH, payload: {}});
      }
    } catch (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      dispatch({type: GET_VEHICLE_GRAPH, payload: {}});
    }
  };
};

export const onLatestSoldVehicle = () => {
  return async (dispatch) => {
    const {messages} = appIntl();
    dispatch({type: FETCH_START});
    try {
      const res = await jwtAxios.get('/latest/sold_vehicles');
      if (res.status === 200 && res.data.result) {
        dispatch({type: FETCH_SUCCESS});
        console.log(res.data.data);
        dispatch({type: GET_LATEST_SOLD_VEHICLES, payload: res.data.data});
      } else {
        dispatch({
          type: FETCH_ERROR,
          payload: messages['message.somethingWentWrong'],
        });
        dispatch({type: GET_LATEST_SOLD_VEHICLES, payload: {}});
      }
    } catch (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      dispatch({type: GET_LATEST_SOLD_VEHICLES, payload: {}});
    }
  };
};
