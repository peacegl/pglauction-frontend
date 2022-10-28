import {
  GET_USER_LIST,
  FETCH_START,
  FETCH_SUCCESS,
  FETCH_ERROR,
} from 'shared/constants/ActionTypes';

import {appIntl} from '../../@crema/utility/helper/Utils';
import jwtAxios from '@crema/services/auth/jwt-auth';

export const onGetUserList = (filterData) => {
  return (dispatch) => {
    const {messages} = appIntl();
    dispatch({type: FETCH_START});
    return jwtAxios
      .get('/users', {
        params: {
          page: filterData?.page,
          per_page: filterData?.per_page,
          ...filterData,
        },
      })
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: GET_USER_LIST, payload: data.data});
        } else {
          dispatch({
            type: FETCH_ERROR,
            payload: messages['message.somethingWentWrong'],
          });
          dispatch({type: GET_USER_LIST, payload: {}});
        }
      })
      .catch((error) => {
        dispatch({type: FETCH_ERROR, payload: error.message});
        dispatch({type: GET_USER_LIST, payload: {}});
      });
  };
};
