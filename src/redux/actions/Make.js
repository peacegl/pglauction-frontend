import {
  GET_MAKE_LIST,
  ADD_NEW_MAKE,
  UPDATE_MAKE,
  FETCH_START,
  FETCH_SUCCESS,
  FETCH_ERROR,
  SHOW_MESSAGE,
} from 'shared/constants/ActionTypes';

import {appIntl} from '../../@crema/utility/helper/Utils';
import jwtAxios from '@crema/services/auth/jwt-auth';

export const onGetMakeList = (filterData) => {
  return async (dispatch) => {
    const {messages} = appIntl();
    dispatch({type: FETCH_START});
    try {
      const res = await jwtAxios.get('/makes', {
        params: {...filterData},
      });
      if (res.status === 200 && res.data.result) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: GET_MAKE_LIST, payload: res.data});
      } else {
        dispatch({
          type: FETCH_ERROR,
          payload: messages['message.somethingWentWrong'],
        });
        dispatch({type: GET_MAKE_LIST, payload: {}});
      }
    } catch (error) {
      if(error?.response?.data?.message){
        dispatch({type: FETCH_ERROR, payload:error.response.data.message});
      }else{
        dispatch({type: FETCH_ERROR, payload: error.message});
      }
      dispatch({type: GET_MAKE_LIST, payload: {}});
    }
  };
};

export const onInsertMake = (data, toggleOpen) => {
  return async (dispatch) => {
    dispatch({type: FETCH_START});
    const {messages} = appIntl();
    try {
      const res = await jwtAxios.post(`/makes`, data);
      if (res.status === 201 && res.data.result) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: ADD_NEW_MAKE, payload: res.data.data});
        toggleOpen(false);
        dispatch({
          type: SHOW_MESSAGE,
          payload: messages['message.makeCreated'],
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

export const onUpdateMake = (id, data, toggleOpen) => {
  return async (dispatch) => {
    dispatch({type: FETCH_START});
    const {messages} = appIntl();
    try {
      const res = await jwtAxios.put(`/makes/${id}`, data);
      if (res.status === 202 && res.data.result) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: UPDATE_MAKE, payload: res.data.data});
        toggleOpen(false);
        dispatch({
          type: SHOW_MESSAGE,
          payload: messages['message.makeUpdated'],
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

export const onDeleteMakes = (data) => {
  return async (dispatch) => {
    const {messages} = appIntl();
    dispatch({type: FETCH_START});
    try {
      const res = await jwtAxios.delete('/makes/delete', {data});
      if (res.status === 200 && res.data.result) {
        dispatch({type: GET_MAKE_LIST, payload: res.data});
        dispatch({
          type: SHOW_MESSAGE,
          payload: messages['message.makeDeleted'],
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
