import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  GET_WEB_AUCTIONS,
  SET_WEB_AUCTION_VIEW_TYPE,
  GET_UP_COMING_WEB_AUCTIONS,
  GET_WEB_AUCTION_ITEMS,
  LOADING_VEHICLE,
} from 'shared/constants/ActionTypes';
import jwtAxios from '@crema/services/auth/jwt-auth';
import {appIntl} from '@crema/utility/helper/Utils';

export const onGetWebAuctionData = (filterData) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    jwtAxios
      .get(`/website/auctions`, {
        params: {
          page: filterData?.page,
          ...filterData,
        },
      })
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          if (filterData?.dayData == 'today') {
            dispatch({type: GET_WEB_AUCTIONS, payload: data.data});
          } else {
            dispatch({type: GET_UP_COMING_WEB_AUCTIONS, payload: data.data});
          }
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

export const onGetWebAuctionItemsData = (id, filterData) => {
  return async (dispatch) => {
    dispatch({type: LOADING_VEHICLE, payload: true});
    dispatch({type: GET_WEB_AUCTION_ITEMS, payload: {}});
    dispatch({type: FETCH_START});
    const {messages} = appIntl();
    try {
      const res = await jwtAxios.get(`/website/auctions_items/${id}`, {
        params: {
          ...filterData,
        },
      });
      if (res.status === 200 && res.data.result) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: GET_WEB_AUCTION_ITEMS, payload: res?.data});
      } else {
        dispatch({
          type: FETCH_ERROR,
          payload: messages['message.somethingWentWrong'],
        });
      }
      dispatch({type: LOADING_VEHICLE, payload: false});
    } catch (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      dispatch({type: LOADING_VEHICLE, payload: false});
    }
  };
};

export const setAuctionsViewType = (viewType) => {
  return (dispatch) => {
    dispatch({type: SET_WEB_AUCTION_VIEW_TYPE, payload: viewType});
  };
};
