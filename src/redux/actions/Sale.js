import {
  GET_SALE_LIST,
  FETCH_START,
  FETCH_SUCCESS,
  FETCH_ERROR,
  ADD_NEW_SALE,
  UPDATE_SALE,
  SHOW_MESSAGE,
  GET_ALL_SALES_LIST,
} from 'shared/constants/ActionTypes';

import {appIntl} from '../../@crema/utility/helper/Utils';
import jwtAxios from '@crema/services/auth/jwt-auth';

export const onGetSaleList = (filterData) => {
  return async (dispatch) => {
    const {messages} = appIntl();
    dispatch({type: FETCH_START});
    try {
      const res = await jwtAxios.get('/sales', {
        params: {...filterData},
      });
      if (res.status === 200 && res.data.result) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: GET_SALE_LIST, payload: res.data});
      } else {
        dispatch({
          type: FETCH_ERROR,
          payload: messages['message.somethingWentWrong'],
        });
        dispatch({type: GET_SALE_LIST, payload: {}});
      }
    } catch (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      dispatch({type: GET_SALE_LIST, payload: {}});
    }
  };
};

export const onGetAllSales = (filterData) => {
  return async (dispatch) => {
    const {messages} = appIntl();
    dispatch({type: FETCH_START});
    try {
      const res = await jwtAxios.get('/sales', {
        params: {...filterData},
      });
      if (res.status === 200 && res.data.result) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: GET_SALE_LIST, payload: res.data});
      } else {
        dispatch({
          type: FETCH_ERROR,
          payload: messages['message.somethingWentWrong'],
        });
        dispatch({type: GET_SALE_LIST, payload: {}});
      }
    } catch (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      dispatch({type: GET_SALE_LIST, payload: {}});
    }
  };
};

export const onAddSale = (data, toggleOpen) => {
  return async (dispatch) => {
    dispatch({type: FETCH_START});
    const {messages} = appIntl();
    try {
      const res = await jwtAxios.post(`/sales`, data);
      if (res.status === 201 && res.data.result) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: ADD_NEW_SALE, payload: res.data.data});
        toggleOpen(false);
        dispatch({
          type: SHOW_MESSAGE,
          payload: messages['message.saleAdded'],
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
export const onUpdateSale = (id, data, toggleOpen) => {
  return async (dispatch) => {
    dispatch({type: FETCH_START});
    const {messages} = appIntl();
    try {
      const res = await jwtAxios.put(`/sales/${id}`, data);
      if (res.status === 202 && res.data.result) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: UPDATE_SALE, payload: res.data.data});
        toggleOpen(false);
        dispatch({
          type: SHOW_MESSAGE,
          payload: messages['message.saleUpdated'],
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
export const onDeleteSales = (data) => {
  return async (dispatch) => {
    const {messages} = appIntl();
    dispatch({type: FETCH_START});
    try {
      const res = await jwtAxios.delete('/sales/delete', {data});
      if (res.status === 200 && res.data.result) {
        dispatch({type: GET_SALE_LIST, payload: res.data});
        dispatch({
          type: SHOW_MESSAGE,
          payload: messages['sale.message.deleted'],
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

export const addRealTimeSale = (data) => {
  return async (dispatch) => {
    try {
      dispatch({type: ADD_NEW_SALE, payload: data});
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateRealTimeSale = (data) => {
  return async (dispatch) => {
    try {
      dispatch({type: UPDATE_SALE, payload: data});
    } catch (error) {
      console.log(error);
    }
  };
};
