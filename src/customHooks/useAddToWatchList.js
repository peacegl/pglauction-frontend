import {FETCH_ERROR} from 'shared/constants/ActionTypes';
import {useAuthUser} from '@crema/utility/AuthHooks';
import jwtAxios from '@crema/services/auth/jwt-auth';
import {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';

export default function useAddToWatchList(item, setShowSignInModl) {
  const [addedToWatchList, setAddedToWatchList] = useState(false);
  const [watchlistLoading, setWatchlistLoading] = useState(false);
  const [itemId, setItemId] = useState('');
  const {user} = useAuthUser();
  const dispatch = useDispatch();

  const addToWatchList = async (vehicle_id) => {
    if (user?.email) {
      sendRequest(vehicle_id);
    } else {
      setItemId(vehicle_id);
      setShowSignInModl(true);
    }
  };
  const sendRequest = async (vehicle_id, type = '') => {
    try {
      setWatchlistLoading(true);
      const res = await jwtAxios.post('/add_remove_watchlist', {
        vehicle_id: vehicle_id,
        type: type,
      });
      if (res.status === 201 && res.data.result) {
        setAddedToWatchList(true);
      } else if (res.status === 202 && res.data.result) {
        setAddedToWatchList(false);
      }
      setWatchlistLoading(false);
    } catch (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});

      setWatchlistLoading(false);
    }
  };
  useEffect(() => {
    setAddedToWatchList(item?.is_added_to_watchlist);
  }, [item]);

  useEffect(() => {
    if (user?.type && itemId) {
      sendRequest(itemId, 'add');
      setItemId('');
    }
  }, [user?.type]);

  return {
    addToWatchList: addToWatchList,
    watchlistLoading: watchlistLoading,
    addedToWatchList: addedToWatchList,
  };
}
