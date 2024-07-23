import {
  GET_MODEL_LIST,
  ADD_NEW_MODEL,
  UPDATE_MODEL,
  FETCH_START,
  FETCH_SUCCESS,
  FETCH_ERROR,
  SHOW_MESSAGE,
} from 'shared/constants/ActionTypes';

import {appIntl} from '../../@crema/utility/helper/Utils';
import jwtAxios from '@crema/services/auth/jwt-auth';

export const onGetModelList = (filterData) => {
  return async (dispatch) => {
    const {messages} = appIntl();
    dispatch({type: FETCH_START});
    try {
      const res = await jwtAxios.get('/models', {
        params: {...filterData},
      });
      if (res.status === 200 && res.data.result) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: GET_MODEL_LIST, payload: res.data});
      } else {
        dispatch({
          type: FETCH_ERROR,
          payload: messages['message.somethingWentWrong'],
        });
        dispatch({type: GET_MODEL_LIST, payload: {}});
      }
    } catch (error) {
      if(error?.response?.data?.message){
        dispatch({type: FETCH_ERROR, payload:error.response.data.message});
      }else{
        dispatch({type: FETCH_ERROR, payload: error.message});
      }
      dispatch({type: GET_MODEL_LIST, payload: {}});
    }
  };
};

export const onInsertModel = (data, toggleOpen) => {
  return async (dispatch) => {
    dispatch({type: FETCH_START});
    const {messages} = appIntl();
    try {
      const res = await jwtAxios.post(`/models`, data);
      if (res.status === 201 && res.data.result) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: ADD_NEW_MODEL, payload: res.data.data});
        toggleOpen(false);
        dispatch({
          type: SHOW_MESSAGE,
          payload: messages['message.modelCreated'],
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

export const onUpdateModel = (id, data, toggleOpen) => {
  return async (dispatch) => {
    dispatch({type: FETCH_START});
    const {messages} = appIntl();
    try {
      const res = await jwtAxios.put(`/models/${id}`, data);
      if (res.status === 202 && res.data.result) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: UPDATE_MODEL, payload: res.data.data});
        toggleOpen(false);
        dispatch({
          type: SHOW_MESSAGE,
          payload: messages['message.modelUpdated'],
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

export const onDeleteModels = (data) => {
  return async (dispatch) => {
    const {messages} = appIntl();
    dispatch({type: FETCH_START});
    try {
      const res = await jwtAxios.delete('/models/delete', {data});
      if (res.status === 200 && res.data.result) {
        dispatch({type: GET_MODEL_LIST, payload: res.data});
        dispatch({
          type: SHOW_MESSAGE,
          payload: messages['message.modelDeleted'],
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
