import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  GET_AUCTION_ITEMS,
  GET_WEB_AUCTION_ITEMS,
  GET_CATEGORIES,
  SET_AUCTION_ITEM_FILTER_DATA,
  SET_AUCTION_ITEM_DATA,
  UPDATE_AUCTION,
  SET_AUCTION_ITEM_VIEW_TYPE,
  SHOW_MESSAGE,
} from '../../shared/constants/ActionTypes';
import jwtAxios from '@crema/services/auth/jwt-auth';
import {appIntl} from '../../@crema/utility/helper/Utils';

export const onGetAuctionData = (filterData) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    jwtAxios
      .get(`/auction_items`, {
        params: {
          page: filterData?.page,
          ...filterData,
        },
      })
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: GET_AUCTION_ITEMS, payload: data.data});
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

export const onGetWebAuctionData = (filterData) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    jwtAxios
      .get(`/fetchItems`, {
        params: {
          page: filterData?.page,
          ...filterData,
        },
      })
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: GET_WEB_AUCTION_ITEMS, payload: data.data});
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

export const onUpdateAuction = (id, data, toggleOpen) => {
  return async (dispatch) => {
    dispatch({type: FETCH_START});
    const {messages} = appIntl();
    try {
      const res = await jwtAxios.post(`/auction_items/${id}?_method=PUT`, data);
      if (res.status === 202 && res.data.result) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: UPDATE_AUCTION, payload: res.data.data});
        toggleOpen(false);
        dispatch({
          type: SHOW_MESSAGE,
          payload: messages['message.auctionUpdated'],
        });
      } else {
        dispatch({
          type: FETCH_ERROR,
          payload: messages['message.somethingWentWrong'],
        });
      }
    } catch (error) {
      if (error.request?.status == 422) {
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

export const onDeleteAuctions = (data) => {
  return async (dispatch) => {
    const {messages} = appIntl();
    dispatch({type: FETCH_START});
    try {
      const res = await jwtAxios.delete('/auction_items/delete', {data});
      if (res.status === 200 && res.data.result) {
        dispatch({type: GET_AUCTION_ITEMS, payload: res.data});
        dispatch({
          type: SHOW_MESSAGE,
          payload: messages['auctionItem.message.deleted'],
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

export const onGetCategories = (filterData) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    jwtAxios
      .get(`/categories`, {
        params: {
          page: filterData?.page,
          ...filterData,
        },
      })
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: GET_CATEGORIES, payload: data.data});
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
export const getAuctionDetail = (id) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    jwtAxios
      .get('/auction_items', {
        params: {id: id},
      })
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: SET_AUCTION_ITEM_DATA, payload: data.data});
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
export const setAuctionViewType = (viewType) => {
  return (dispatch) => {
    dispatch({type: SET_AUCTION_ITEM_VIEW_TYPE, payload: viewType});
  };
};

export const setCurrentAuction = (product) => {
  return (dispatch) => {
    dispatch({type: SET_AUCTION_ITEM_DATA, payload: product});
  };
};

export const setFilters = (filters) => {
  return (dispatch) => {
    dispatch({type: SET_AUCTION_ITEM_FILTER_DATA, payload: filters});
  };
};
