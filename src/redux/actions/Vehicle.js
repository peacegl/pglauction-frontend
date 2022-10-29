import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  GET_VEHICLE_LIST,
  SET_VEHICLE_FILTER_DATA,
} from '../../shared/constants/ActionTypes';
import {appIntl} from '../../@crema/utility/helper/Utils';
import jwtAxios from '@crema/services/auth/jwt-auth';

export const onGetVehicleData = (filterData) => {
  return async (dispatch) => {
    dispatch({type: FETCH_START});
    const {messages} = appIntl();
    try {
      const res = await jwtAxios.get(`/vehicles`, {
        params: {
          page: filterData?.page,
          per_page: filterData?.per_page,
          ...filterData,
        },
      });
      if (res.status === 200 && res.data.result) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: GET_VEHICLE_LIST, payload: res.data});
      } else {
        dispatch({
          type: FETCH_ERROR,
          payload: messages['message.somethingWentWrong'],
        });
        dispatch({type: GET_VEHICLE_LIST, payload: {}});
      }
    } catch (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      dispatch({type: GET_VEHICLE_LIST, payload: {}});
    }
  };
};

export const onDeleteVehicles = (vehicleIds) => {
  return async (dispatch) => {
    const {messages} = appIntl();
    dispatch({type: FETCH_START});
    try {
      const res = await jwtAxios.delete('/vehicles/delete', {
        data: {vehicleIds},
      });
      if (res.status === 200 && res.data.result === true) {
        dispatch({type: FETCH_SUCCESS});
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
