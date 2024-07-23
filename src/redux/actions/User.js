import {
  GET_USER_LIST,
  FETCH_START,
  FETCH_SUCCESS,
  FETCH_ERROR,
  SHOW_MESSAGE,
  ADD_NEW_USER,
  UPDATE_USER,
  GET_ALL_USERS_LIST,
  INCREMENT_TOTAL_USER,
} from 'shared/constants/ActionTypes';

import {appIntl} from '../../@crema/utility/helper/Utils';
import jwtAxios from '@crema/services/auth/jwt-auth';

export const onGetUserList = (filterData) => {
  return async (dispatch) => {
    const {messages} = appIntl();
    dispatch({type: FETCH_START});
    try {
      const res = await jwtAxios.get('/users', {
        params: {...filterData},
      });
      if (res.status === 200 && res.data.result) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: GET_USER_LIST, payload: res.data});
      } else {
        dispatch({
          type: FETCH_ERROR,
          payload: messages['message.somethingWentWrong'],
        });
        dispatch({type: GET_USER_LIST, payload: {}});
      }
    } catch (error) {
      if(error?.response?.data?.message){
        dispatch({type: FETCH_ERROR, payload:error.response.data.message});
      }else{
        dispatch({type: FETCH_ERROR, payload: error.message});
      }
      dispatch({type: GET_USER_LIST, payload: {}});
    }
  };
};

// for exporting data
export const onGetAllUsers = (filterData) => {
  return async (dispatch) => {
    dispatch({type: FETCH_START});
    const {messages} = appIntl();
    try {
      const res = await jwtAxios.get(`/users`, {
        params: {...filterData},
      });
      if (res.status === 200 && res.data.result) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: GET_ALL_USERS_LIST, payload: res.data});
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

export const onInsertUser = (data, toggleOpen) => {
  return async (dispatch) => {
    dispatch({type: FETCH_START});
    const {messages} = appIntl();
    try {
      const res = await jwtAxios.post(`/users`, data);
      if (res.status === 201 && res.data.result) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: ADD_NEW_USER, payload: res.data.data});
        toggleOpen(false);
        dispatch({
          type: SHOW_MESSAGE,
          payload: messages['message.userCreated'],
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
export const onUpdateUser = (id, data, toggleOpen) => {
  return async (dispatch) => {
    dispatch({type: FETCH_START});
    const {messages} = appIntl();
    try {
      const res = await jwtAxios.post(`/users/${id}?_method=PUT`, data);
      if (res.status === 202 && res.data.result) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: UPDATE_USER, payload: res.data.data});
        toggleOpen(false);
        dispatch({
          type: SHOW_MESSAGE,
          payload: messages['message.userUpdated'],
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
export const onDeleteUsers = (data) => {
  return async (dispatch) => {
    const {messages} = appIntl();
    dispatch({type: FETCH_START});
    try {
      const res = await jwtAxios.delete('/users/delete', {data});
      if (res.status === 200 && res.data.result) {
        dispatch({type: GET_USER_LIST, payload: res.data});
        dispatch({
          type: SHOW_MESSAGE,
          payload: messages['user.message.deleted'],
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
export const onUpdateAuthUser = (
  url,
  data,
  passwordChanged = false,
  user = {},
  updateAuthUser,
  setPendingVerification,
) => {
  return async (dispatch) => {
    dispatch({type: FETCH_START});
    const {messages} = appIntl();
    try {
      const res = await jwtAxios.post(url, data);
      if (res.status === 202 && res.data.result) {
        dispatch({type: FETCH_SUCCESS});
        if (updateAuthUser) updateAuthUser({...user, ...res.data.data});
        if (
          setPendingVerification &&
          res.data.data.customer_status == 'pending verification'
        ) {
          setPendingVerification(true);
        }
        dispatch({
          type: SHOW_MESSAGE,
          payload:
            messages[
              passwordChanged
                ? 'message.passwordChanged'
                : 'message.profileUpdated'
            ],
        });
      } else {
        dispatch({
          type: FETCH_ERROR,
          payload: messages['message.somethingWentWrong'],
        });
      }
    } catch (error) {
      if (passwordChanged) {
        if (error?.request?.status == 400) {
          dispatch({
            type: FETCH_ERROR,
            payload: messages['message.wrongPassword'],
          });
        } else {
          if(error?.response?.data?.message){
        dispatch({type: FETCH_ERROR, payload:error.response.data.message});
      }else{
        dispatch({type: FETCH_ERROR, payload: error.message});
      }
        }
      } else {
        if(error?.response?.data?.message){
        dispatch({type: FETCH_ERROR, payload:error.response.data.message});
      }else{
        dispatch({type: FETCH_ERROR, payload: error.message});
      }
      }
    }
  };
};

export const addRealTimeUser = (data) => {
  return async (dispatch) => {
    try {
      dispatch({type: ADD_NEW_USER, payload: data});
    } catch (error) {
      console.log(error);
    }
  };
};
export const addRealTimeUserCount = (data) => {
  return async (dispatch) => {
    try {
      dispatch({type: INCREMENT_TOTAL_USER, payload: data});
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateRealTimeUser = (data) => {
  return async (dispatch) => {
    try {
      dispatch({type: UPDATE_USER, payload: data});
    } catch (error) {
      console.log(error);
    }
  };
};
