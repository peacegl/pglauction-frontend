import jwtAxios from '@crema/services/auth/jwt-auth';
import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  HIDE_MESSAGE,
  SHOW_MESSAGE,
  TOGGLE_APP_DRAWER,
  UPDATING_CONTENT,
  GET_USER_AUTOCOMPLETE_OPTIONS,
} from 'shared/constants/ActionTypes';
import {appIntl} from '../../@crema/utility/helper/Utils';

export const fetchStart = () => {
  return (dispatch) => dispatch({type: FETCH_START});
};

export const fetchSuccess = () => {
  return (dispatch) => dispatch({type: FETCH_SUCCESS});
};
export const updatingContent = () => {
  return (dispatch) => dispatch({type: UPDATING_CONTENT});
};

export const fetchError = (error) => {
  return (dispatch) => dispatch({type: FETCH_ERROR, payload: error});
};

export const showMessage = (message) => {
  return (dispatch) => dispatch({type: SHOW_MESSAGE, payload: message});
};
export const onToggleAppDrawer = () => {
  return (dispatch) => dispatch({type: TOGGLE_APP_DRAWER});
};

export const hideMessage = () => {
  return (dispatch) => dispatch({type: HIDE_MESSAGE});
};

export const getUserAutocompleteOptions = () => {
  return async (dispatch, getState) => {
    const {messages} = appIntl();
    const {common} = getState();
    if (common.userAutocompleteOptions?.length <= 0) {
      dispatch({type: FETCH_START});
      try {
        const res = await jwtAxios.get('/user/auto_complete');
        if (res.status === 200 && res.data.result) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({
            type: GET_USER_AUTOCOMPLETE_OPTIONS,
            payload: res.data.data,
          });
        } else {
          dispatch({
            type: FETCH_ERROR,
            payload: messages['message.somethingWentWrong'],
          });
          dispatch({type: GET_USER_AUTOCOMPLETE_OPTIONS, payload: []});
        }
      } catch (error) {
        dispatch({type: FETCH_ERROR, payload: error.message});
        dispatch({type: GET_USER_AUTOCOMPLETE_OPTIONS, payload: []});
      }
    }
  };
};
