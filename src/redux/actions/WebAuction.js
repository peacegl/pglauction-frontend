import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  GET_WEB_AUCTIONS,
  SET_AUCTION_VIEW_TYPE,
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
          dispatch({type: GET_WEB_AUCTIONS, payload: data.data});
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
