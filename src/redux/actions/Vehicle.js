import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  GET_VEHICLE_LIST,
  SET_VEHICLE_FILTER_DATA,
  ADD_NEW_VEHICLE,
  SHOW_MESSAGE,
} from '../../shared/constants/ActionTypes';
import {appIntl} from '../../@crema/utility/helper/Utils';
import jwtAxios from '@crema/services/auth/jwt-auth';

export const onGetVehicleData = (filterData) => {
  return async (dispatch) => {
    dispatch({type: FETCH_START});
    const {messages} = appIntl();
    try {
      const res = await jwtAxios.get(`/vehicles`, {
        params: {...filterData},
      });
      if (res.status === 200 && res.data.result) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: GET_VEHICLE_LIST, payload: res.data});
      } else {
        dispatch({
          type: FETCH_ERROR,
          payload: messages['message.somethingWentWrong'],
        });
      }
    } catch (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
    }
  };
};

export const onInsertVehicle = (data, toggleOpen) => {
  return async (dispatch) => {
    dispatch({type: FETCH_START});
    const {messages} = appIntl();
    try {
      const res = await jwtAxios.post(`/vehicles`, data);
      if (res.status === 201 && res.data.result) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: ADD_NEW_VEHICLE, payload: res.data.data});
        toggleOpen(false);
        dispatch({
          type: SHOW_MESSAGE,
          payload: messages['message.vehicleCreated'],
        });
      } else {
        dispatch({
          type: FETCH_ERROR,
          payload: messages['message.somethingWentWrong'],
        });
      }
    } catch (error) {
      if (error.request.status == 422) {
        const res = JSON.parse(error.request.response);
        console.log('fff', res.errors);
        // res.errors?.forEach((element) => {
        //   dispatch({type: FETCH_ERROR, payload: element.message});
        // });
      }
      dispatch({type: FETCH_ERROR, payload: error.message});
    }
  };
};

export const onDeleteVehicles = (data) => {
  return async (dispatch) => {
    const {messages} = appIntl();
    dispatch({type: FETCH_START});
    try {
      const res = await jwtAxios.delete('/vehicles/delete', {data});
      if (res.status === 200 && res.data.result) {
        dispatch({type: GET_VEHICLE_LIST, payload: res.data});
        dispatch({
          type: SHOW_MESSAGE,
          payload: messages['vehicle.message.deleted'],
        });
      } else {
        dispatch({
          type: FETCH_ERROR,
          payload: messages['message.somethingWentWrong'],
        });
      }
    } catch (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
    }
  };
};

export const setFilters = (filters) => {
  return (dispatch) => {
    dispatch({type: SET_VEHICLE_FILTER_DATA, payload: filters});
  };
};
