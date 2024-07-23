import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  GET_VEHICLE_LIST,
  SET_VEHICLE_FILTER_DATA,
  ADD_NEW_VEHICLE,
  UPDATE_VEHICLE,
  SHOW_MESSAGE,
  GET_ALL_VEHICLE_LIST,
  INCREMENT_TOTAL_VEHICLE,
  GET_VEHICLE_VIEW,
} from 'shared/constants/ActionTypes';
import {appIntl} from '@crema/utility/helper/Utils';
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
      if(error?.response?.data?.message){
        dispatch({type: FETCH_ERROR, payload:error.response.data.message});
      }else{
        dispatch({type: FETCH_ERROR, payload: error.message});
      }
    }
  };
};

export const onGetVehicleView = (id) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    jwtAxios
      .get(`/vehicles/${id}`)
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          data.data.vehicle.images.forEach((image, index, arr) => {
            if (image.type == 'main_image') {
              arr.unshift(image);
              arr.splice(index + 1, 1);
              return;
            }
          });
          dispatch({type: GET_VEHICLE_VIEW, payload: data.data});
        } else {
          dispatch({
            type: FETCH_ERROR,
            payload: 'Something went wrong, Please try again!',
          });
        }
      })
      .catch((error) => {
        if(error?.response?.data?.message){
        dispatch({type: FETCH_ERROR, payload:error.response.data.message});
      }else{
        dispatch({type: FETCH_ERROR, payload: error.message});
      }
      });
  };
};

// for exporting data
export const onGetAllVehicle = (filterData) => {
  return async (dispatch) => {
    const {messages} = appIntl();
    try {
      const res = await jwtAxios.get(`/vehicles`, {
        params: {...filterData},
      });
      if (res.status === 200 && res.data.result) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: GET_ALL_VEHICLE_LIST, payload: res.data});
      } else {
        dispatch({
          type: FETCH_ERROR,
          payload: messages['message.somethingWentWrong'],
        });
      }
    } catch (error) {
      if(error?.response?.data?.message){
        dispatch({type: FETCH_ERROR, payload:error.response.data.message});
      }else{
        dispatch({type: FETCH_ERROR, payload: error.message});
      }
    }
  };
};

// for exporting data

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
      if(error?.response?.data?.message){
        dispatch({type: FETCH_ERROR, payload:error.response.data.message});
      }else{
        dispatch({type: FETCH_ERROR, payload: error.message});
      }
    }
  };
};
export const onUpdateVehicle = (id, data, toggleOpen) => {
  return async (dispatch) => {
    dispatch({type: FETCH_START});
    const {messages} = appIntl();
    try {
      const res = await jwtAxios.post(`/vehicles/${id}?_method=PUT`, data);
      if (res.status === 202 && res.data.result) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: UPDATE_VEHICLE, payload: res.data.data});
        toggleOpen(false);
        dispatch({
          type: SHOW_MESSAGE,
          payload: messages['message.vehicleUpdated'],
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
      if(error?.response?.data?.message){
        dispatch({type: FETCH_ERROR, payload:error.response.data.message});
      }else{
        dispatch({type: FETCH_ERROR, payload: error.message});
      }
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
      if(error?.response?.data?.message){
        dispatch({type: FETCH_ERROR, payload:error.response.data.message});
      }else{
        dispatch({type: FETCH_ERROR, payload: error.message});
      }
    }
  };
};

export const setVehicleFilters = (filters) => {
  return (dispatch) => {
    dispatch({type: SET_VEHICLE_FILTER_DATA, payload: filters});
  };
};

export const onSaleVehicle = (data, toggleOpen) => {
  return async (dispatch) => {
    dispatch({type: FETCH_START});
    const {messages} = appIntl();
    try {
      const res = await jwtAxios.post(`/sell_vehicle`, data);
      if (res.status === 201 && res.data.result) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: UPDATE_VEHICLE, payload: res.data.data});
        toggleOpen(false);
        dispatch({
          type: SHOW_MESSAGE,
          payload: messages['message.vehicleUpdated'],
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
      if(error?.response?.data?.message){
        dispatch({type: FETCH_ERROR, payload:error.response.data.message});
      }else{
        dispatch({type: FETCH_ERROR, payload: error.message});
      }
    }
  };
};

export const addRealTimeVehicle = (data) => {
  return async (dispatch) => {
    try {
      dispatch({type: ADD_NEW_VEHICLE, payload: data});
    } catch (error) {
      console.log(error);
    }
  };
};

export const addRealTimeVehicleCount = (data) => {
  return async (dispatch) => {
    try {
      dispatch({type: INCREMENT_TOTAL_VEHICLE, payload: data});
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateRealTimeVehicle = (data) => {
  return async (dispatch) => {
    try {
      dispatch({type: UPDATE_VEHICLE, payload: data});
    } catch (error) {
      console.log(error);
    }
  };
};
