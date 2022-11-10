import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  GET_AUCTIONS,
  GET_CATEGORIES,
  SET_AUCTION_FILTER_DATA,
  SET_AUCTION_DATA,
  SET_AUCTION_VIEW_TYPE,
} from '../../shared/constants/ActionTypes';
import jwtAxios from '@crema/services/auth/jwt-auth';

export const onGetAuctionData = (filterData) => {
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
          dispatch({type: GET_AUCTIONS, payload: data.data});
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
      .get('/auctions', {
        params: {id: id},
      })
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: SET_AUCTION_DATA, payload: data.data});
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
    dispatch({type: SET_AUCTION_VIEW_TYPE, payload: viewType});
  };
};

export const setCurrentAuction = (product) => {
  return (dispatch) => {
    dispatch({type: SET_AUCTION_DATA, payload: product});
  };
};

export const setFilters = (filters) => {
  return (dispatch) => {
    dispatch({type: SET_AUCTION_FILTER_DATA, payload: filters});
  };
};
