import React, {useEffect, useState} from 'react';
import DealsTable from './DealsTable';
import IntlMessages from '../../../../@crema/utility/IntlMessages';
import {useIntl} from 'react-intl';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import {Fonts} from '../../../../shared/constants/AppEnums';
import AppCard from '../../../../@crema/core/AppCard';
import AppSelect from '../../../../@crema/core/AppSelect';

import {useDispatch, useSelector} from 'react-redux';
import {onGetVehicleAuctionData} from 'redux/actions';
import {CardActions, Pagination} from '@mui/material';

const AuctionVehicleList = ({auctionId}) => {
  const dispatch = useDispatch();
  const {data = [], total = 0} = useSelector(
    ({auctions}) => auctions.auctionItemList,
  );
  const {loading} = useSelector(({common}) => common);
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(10);

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

  const onPageChange2 = (event, value) => {
    setPage(value - 1);
  };

  const handleChange = (value) => {
    // if (value === messages['website.allVehicles']) {
    //   setTableData(data);
    // } else if (value === messages['common.available']) {
    //   setTableData(data.filter((data) => data.status === 'available'));
    // } else {
    //   setTableData(data.filter((data) => data.status === 'sold'));
    // }
  };

  const {messages} = useIntl();

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
        <DealsTable dealsTableData={data} />
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
