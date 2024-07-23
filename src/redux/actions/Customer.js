import {
  GET_CUSTOMER_LIST,
  FETCH_START,
  FETCH_SUCCESS,
  FETCH_ERROR,
  SHOW_MESSAGE,
  ADD_NEW_CUSTOMER,
  UPDATE_CUSTOMER,
  GET_ALL_CUSTOMER_LIST,
  INCREMENT_TOTAL_CUSTOMER,
} from 'shared/constants/ActionTypes';

import {appIntl} from '../../@crema/utility/helper/Utils';
import jwtAxios from '@crema/services/auth/jwt-auth';

export const onGetCustomerList = (filterData) => {
  return async (dispatch) => {
    const {messages} = appIntl();
    dispatch({type: FETCH_START});
    try {
      const res = await jwtAxios.get('/customers', {
        params: {...filterData},
      });
      if (res.status === 200 && res.data.result) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: GET_CUSTOMER_LIST, payload: res.data});
      } else {
        dispatch({
          type: FETCH_ERROR,
          payload: messages['message.somethingWentWrong'],
        });
        dispatch({type: GET_CUSTOMER_LIST, payload: {}});
      }
    } catch (error) {
      if(error?.response?.data?.message){
        dispatch({type: FETCH_ERROR, payload:error.response.data.message});
      }else{
        dispatch({type: FETCH_ERROR, payload: error.message});
      }
      dispatch({type: GET_CUSTOMER_LIST, payload: {}});
    }
  };
};

// for exporting data
export const onGetAllCustomers = (filterData) => {
  return async (dispatch) => {
    dispatch({type: FETCH_START});
    const {messages} = appIntl();
    try {
      const res = await jwtAxios.get(`/customers`, {
        params: {...filterData},
      });
      if (res.status === 200 && res.data.result) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: GET_ALL_CUSTOMER_LIST, payload: res.data});
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

export const onInsertCustomer = (data, toggleOpen) => {
  return async (dispatch) => {
    dispatch({type: FETCH_START});
    const {messages} = appIntl();
    try {
      const res = await jwtAxios.post(`/customers`, data);
      if (res.status === 201 && res.data.result) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: ADD_NEW_CUSTOMER, payload: res.data.data});
        if (toggleOpen) toggleOpen(false);
        dispatch({
          type: SHOW_MESSAGE,
          payload: messages['message.customerCreated'],
        });
      } else {
        dispatch({
          type: FETCH_ERROR,
          payload: messages['message.somethingWentWrong'],
        });
      }
    } catch (error) {
      if (error?.request?.status == 422) {
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
export const onUpdateCustomer = (id, data, toggleOpen) => {
  return async (dispatch) => {
    dispatch({type: FETCH_START});
    const {messages} = appIntl();
    try {
      const res = await jwtAxios.post(`/customers/${id}?_method=PUT`, data);
      if (res.status === 202 && res.data.result) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: UPDATE_CUSTOMER, payload: res.data.data});
        toggleOpen(false);
        dispatch({
          type: SHOW_MESSAGE,
          payload: messages['message.customerUpdated'],
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

export const onDeleteCustomers = (data) => {
  return async (dispatch) => {
    const {messages} = appIntl();
    dispatch({type: FETCH_START});
    try {
      const res = await jwtAxios.delete('/customers/delete', {data});
      if (res.status === 200 && res.data.result) {
        dispatch({type: GET_CUSTOMER_LIST, payload: res.data});
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
export const onSignUpCustomer = (data, values, signInUser) => {
  return async (dispatch) => {
    dispatch({type: FETCH_START});
    const {messages} = appIntl();
    try {
      const res = await jwtAxios.post(`/customer_create_account`, data);
      if (res.status === 201 && res.data.result) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({
          type: SHOW_MESSAGE,
          payload: messages['message.signupSuccessfully'],
        });
        await signInUser({
          email_or_username: values.email,
          password: values.password,
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
export const onVerifyCustomer = (id, data, toggleOpen) => {
  return async (dispatch) => {
    dispatch({type: FETCH_START});
    const {messages} = appIntl();
    try {
      const res = await jwtAxios.put(`/customers/verify/${id}`, data);
      if (res.status === 202 && res.data.result) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: UPDATE_CUSTOMER, payload: res.data.data});
        toggleOpen(false);
        dispatch({
          type: SHOW_MESSAGE,
          payload: messages['message.customerUpdated'],
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

export const addRealTimeCustomer = (data) => {
  return async (dispatch) => {
    try {
      dispatch({type: ADD_NEW_CUSTOMER, payload: data});
    } catch (error) {
      console.log(error);
    }
  };
};

export const addRealTimeCustomerCount = (data) => {
  return async (dispatch) => {
    try {
      dispatch({type: INCREMENT_TOTAL_CUSTOMER, payload: data});
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateRealTimeCustomer = (data) => {
  return async (dispatch) => {
    try {
      dispatch({type: UPDATE_CUSTOMER, payload: data});
    } catch (error) {
      console.log(error);
    }
  };
};
