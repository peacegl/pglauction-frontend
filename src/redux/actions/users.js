import {
  GET_USER_LIST,
  SELECT_USER,
  FETCH_START,
  FETCH_SUCCESS,
  FETCH_ERROR,
} from 'shared/constants/ActionTypes';

import {appIntl} from '../../@crema/utility/helper/Utils';
import jwtAxios from '@crema/services/auth/jwt-auth';

export const onGetUserList = (page = 1, per_page = 20) => {
  return (dispatch) => {
    const {messages} = appIntl();
    dispatch({type: FETCH_START});
    jwtAxios
      .get('/users', {params: {page, per_page}})
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: GET_USER_LIST, payload: data.data});
        } else {
          dispatch({
            type: FETCH_ERROR,
            payload: messages['message.somethingWentWrong'],
          });
        }
      })
      .catch((error) => {
        dispatch({type: FETCH_ERROR, payload: error.message});
      });
  };
};

export const onSetSelected = (newSelected) => {
  return (dispatch) => {
    const {messages} = appIntl();
    dispatch({type: SELECT_USER, payload: newSelected});
  };
};
