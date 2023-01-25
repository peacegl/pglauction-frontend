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
  GET_BEST_SELLING_VEHICLE_LIST,
  GET_FEATURED_VEHICLE_LIST,
  GET_RECENTLY_ADDED_VEHICLE_LIST,
  GET_MY_WATCH_LIST,
  GET_MY_PURCHASE_LIST,
  SHOW_MESSAGE,
  EMPTY_WEB_VEHICLE_LIST,
  GET_POPULAR_BRANDS_COUNT,
  SET_BRAND_FILTER_DATA,
} from '../../shared/constants/ActionTypes';
import jwtAxios from '@crema/services/auth/jwt-auth';
import {appIntl} from '../../@crema/utility/helper/Utils';

export const onGetWebVehicleData = (data) => {
  return async (dispatch) => {
    dispatch({type: EMPTY_WEB_VEHICLE_LIST, payload: {}});
    dispatch({type: FETCH_START});
    const {messages} = appIntl();
    try {
      const res = await jwtAxios.get(`/website/vehicles`, {
        params: {...data},
      });
      if (res.status === 200 && res.data.result) {
        await dispatch({type: GET_WEB_VEHICLE_LIST, payload: res.data});
        dispatch({type: FETCH_SUCCESS});
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

export const setBrandFilter = (filters) => {
  return (dispatch) => {
    dispatch({type: SET_BRAND_FILTER_DATA, payload: filters});
  };
};

export const onGetFeaturedVehicles = () => {
  return async (dispatch) => {
    dispatch({type: FETCH_START});
    const {messages} = appIntl();
    try {
      const res = await jwtAxios.get(`/featured_vehicles`);
      if (res.status === 200 && res.data.result) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: GET_FEATURED_VEHICLE_LIST, payload: res.data.data});
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

export const onCountPopularBrands = () => {
  return async (dispatch) => {
    dispatch({type: FETCH_START});
    const {messages} = appIntl();
    try {
      const res = await jwtAxios.get(`/count_populars`);
      if (res.status === 200 && res.data.result) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: GET_POPULAR_BRANDS_COUNT, payload: res.data.data});
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

export const onGetBestSellingVehicles = () => {
  return async (dispatch) => {
    dispatch({type: FETCH_START});
    const {messages} = appIntl();
    try {
      const res = await jwtAxios.get(`/best_selling_vehicles`);
      if (res.status === 200 && res.data.result) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: GET_BEST_SELLING_VEHICLE_LIST, payload: res.data.data});
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

export const onGetRecentlyAddedVehicles = () => {
  return async (dispatch) => {
    dispatch({type: FETCH_START});
    const {messages} = appIntl();
    try {
      const res = await jwtAxios.get(`/recently_added`);
      if (res.status === 200 && res.data.result) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({
          type: GET_RECENTLY_ADDED_VEHICLE_LIST,
          payload: res.data.data,
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
export const onGetMyWatchList = (data) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    jwtAxios
      .get(`/website/my_watch_list`, {
        params: {...data},
      })
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: GET_MY_WATCH_LIST, payload: data.data});
          dispatch({type: FETCH_SUCCESS});
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

export const onDeleteMyWatchList = (data) => {
  return async (dispatch) => {
    const {messages} = appIntl();
    dispatch({type: FETCH_START});
    try {
      const res = await jwtAxios.put(`website/delete_my_watch_list`, data);
      if (res.status === 200 && res.data.result) {
        dispatch({type: GET_MY_WATCH_LIST, payload: res.data});
        dispatch({
          type: SHOW_MESSAGE,
          payload: messages['watchlist.message.deleted'],
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

export const onGetMyPurchaseList = (data) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    jwtAxios
      .get(`/website/my_purchase_list`, {
        params: {...data},
      })
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: GET_MY_PURCHASE_LIST, payload: data.data});
          dispatch({type: FETCH_SUCCESS});
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
