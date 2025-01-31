import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  GET_AUCTIONS,
  SET_AUCTION_FILTER_DATA,
  UPDATE_AUCTION,
  SHOW_MESSAGE,
  ADD_NEW_AUCTION,
} from '../../shared/constants/ActionTypes';
import jwtAxios from '@crema/services/auth/jwt-auth';
import {appIntl} from '../../@crema/utility/helper/Utils';

export const onGetAuctionData = (filterData) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    jwtAxios
      .get(`/auctions`, {
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

export const onInsertAuction = (data, toggleOpen) => {
  return async (dispatch) => {
    dispatch({type: FETCH_START});
    const {messages} = appIntl();
    try {
      const res = await jwtAxios.post(`/auctions`, data);
      if (res.status === 201 && res.data.result) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: ADD_NEW_AUCTION, payload: res.data.data});
        toggleOpen(false);
        dispatch({
          type: SHOW_MESSAGE,
          payload: messages['message.auctionCreated'],
        });
      } else {
        dispatch({
          type: FETCH_ERROR,
          payload: messages['message.somethingWentWrong'],
        });
      }
    } catch (error) {
      if (error.request.status == 422) {
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

export const onUpdateAuction = (id, data, toggleOpen) => {
  return async (dispatch) => {
    dispatch({type: FETCH_START});
    const {messages} = appIntl();
    try {
      const res = await jwtAxios.post(`/auctions/${id}?_method=PUT`, data);
      if (res.status === 202 && res.data.result) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: UPDATE_AUCTION, payload: res.data.data});
        toggleOpen(false);
        dispatch({
          type: SHOW_MESSAGE,
          payload: messages['message.auctionItemUpdated'],
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
      const res = await jwtAxios.delete('/auctions/delete', {data});
      if (res.status === 200 && res.data.result) {
        dispatch({type: GET_AUCTIONS, payload: res.data});
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

export const setAuctionFilters = (filters) => {
  return (dispatch) => {
    dispatch({type: SET_AUCTION_FILTER_DATA, payload: filters});
  };
};
