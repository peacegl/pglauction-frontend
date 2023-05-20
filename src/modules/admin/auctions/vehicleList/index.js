import React, {useEffect, useState} from 'react';
import ItemsTable from './ItemsTable';
import {useIntl} from 'react-intl';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import AppCard from '@crema/core/AppCard';

import {useDispatch, useSelector} from 'react-redux';
import {onGetVehicleAuctionData} from 'redux/actions';
import {CardActions, Pagination} from '@mui/material';
import echoWeb from 'plugins/echoWeb';
import {GET_VEHICLE_AUCTIONS_CHANGES} from 'shared/constants/ActionTypes';

const AuctionVehicleList = ({auctionId}) => {
  const dispatch = useDispatch();
  const {data = [], total = 0} = useSelector(
    ({auctions}) => auctions.auctionItemList,
  );
  const {loading} = useSelector(({common}) => common);
  const [page, setPage] = useState(0);
  const perPage = 10;

  useEffect(() => {
    fetchData(auctionId);
  }, [page]);

  const fetchData = async (actionId) => {
    await dispatch(
      onGetVehicleAuctionData(actionId, {
        per_page: perPage,
        page: page + 1,
      }),
    );
  };

  useEffect(() => {
    echoWeb.channel(`web.bid`).listen('Web', (e) => {
      if (e.action == 'bidAccepted') {
        dispatch({
          type: GET_VEHICLE_AUCTIONS_CHANGES,
          payload: e.data[0],
        });
      }
      if (e.action == 'bidCanceled') {
        dispatch({
          type: GET_VEHICLE_AUCTIONS_CHANGES,
          payload: e.data[0],
        });
      }
    });
    return () => {
      const echoChannel = echoWeb.channel(`web.bid`);
      echoChannel.stopListening('Web');
      echoWeb.leave(`web.bid`);
    };
  }, []);

  const onPageChange2 = (event, value) => {
    setPage(value - 1);
  };
  return (
    <AppCard
      contentStyle={{
        px: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {!loading ? (
        <ItemsTable data={data} />
      ) : (
        <Box sx={{height: '500px'}}></Box>
      )}
      <CardActions>
        <Pagination
          count={Math.ceil(total / perPage)}
          page={page + 1}
          onChange={onPageChange2}
          color='primary'
        />
      </CardActions>
    </AppCard>
  );
};

export default AuctionVehicleList;
AuctionVehicleList.propTypes = {
  auctionId: PropTypes.any,
};
