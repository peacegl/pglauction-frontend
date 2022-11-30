import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  GET_WEB_VEHICLE_LIST,
  GET_WEB_VEHICLE_VIEW,
  SET_VEHICLE_SEARCH,
  SET_VEHICLE_VIEW_TYPE,
  GET_WEB_SIMILAR_VEHICLE,
  SET_WEB_VEHICLE_FILTER_DATA,
} from '../../shared/constants/ActionTypes';
import jwtAxios from '@crema/services/auth/jwt-auth';

export const onGetWebVehicleData = (data) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    jwtAxios
      .get(`/website/vehicles`, {
        params: {...data},
      })
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: GET_WEB_VEHICLE_LIST, payload: data.data});
        } else {
          dispatch({
            type: FETCH_ERROR,
            payload: 'Something went wrong, Please try again!',
          });
        }
      })
      .catch((error) => {
        dispatch({type: FETCH_ERROR, payload: error.message});
      });
  };
};
export const onGetWebSimilarVehicle = (id) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    jwtAxios
      .get(`/website/vehicles/${id}/similar`)
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: GET_WEB_SIMILAR_VEHICLE, payload: data.data.data});
        } else {
          dispatch({
            type: FETCH_ERROR,
            payload: 'Something went wrong, Please try again!',
          });
        }
      })
      .catch((error) => {
        dispatch({type: FETCH_ERROR, payload: error.message});
      });
  };
};

export const setVehicleSearch = (data) => {
  return (dispatch) => {
    dispatch({type: SET_VEHICLE_SEARCH, payload: data});
  };
};

export const onGetWebVehicleView = (id) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    jwtAxios
      .get(`/website/vehicles/${id}`)
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          data.data.data.images.forEach((image, index, arr) => {
            if (image.type == 'main_image') {
              arr.unshift(image);
              arr.splice(index + 1, 1);
              return;
            }
          });
          dispatch({type: GET_WEB_VEHICLE_VIEW, payload: data.data.data});
        } else {
          dispatch({
            type: FETCH_ERROR,
            payload: 'Something went wrong, Please try again!',
          });
        }
      })
      .catch((error) => {
        dispatch({type: FETCH_ERROR, payload: error.message});
      });
  };
};

export const setVehicleViewType = (viewType) => {
  return (dispatch) => {
    dispatch({type: SET_VEHICLE_VIEW_TYPE, payload: viewType});
  };
};
export const setWebVehiclesFilter = (filters) => {
  return (dispatch) => {
    dispatch({type: SET_WEB_VEHICLE_FILTER_DATA, payload: filters});
  };
};
