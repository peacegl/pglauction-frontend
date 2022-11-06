import {
  GET_CATEGORY_LIST,
  FETCH_START,
  FETCH_SUCCESS,
  FETCH_ERROR,
  SHOW_MESSAGE,
} from 'shared/constants/ActionTypes';

import {appIntl} from '../../@crema/utility/helper/Utils';
import jwtAxios from '@crema/services/auth/jwt-auth';

export const onGetCategoryList = (filterData) => {
  return async (dispatch) => {
    const {messages} = appIntl();
    dispatch({type: FETCH_START});
    try {
      const res = await jwtAxios.get('/categories', {
        params: {...filterData},
      });
      if (res.status === 200 && res.data.result) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: GET_CATEGORY_LIST, payload: res.data});
      } else {
        dispatch({
          type: FETCH_ERROR,
          payload: messages['message.somethingWentWrong'],
        });
        dispatch({type: GET_CATEGORY_LIST, payload: {}});
      }
    } catch (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      dispatch({type: GET_CATEGORY_LIST, payload: {}});
    }
  };
};

export const onDeleteCategories = (data) => {
  return async (dispatch) => {
    const {messages} = appIntl();
    dispatch({type: FETCH_START});
    try {
      const res = await jwtAxios.delete('/categories/delete', {data});
      if (res.status === 200 && res.data.result) {
        dispatch({type: GET_CATEGORY_LIST, payload: res.data});
        dispatch({
          type: SHOW_MESSAGE,
          payload: messages['message.category.deleted'],
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
