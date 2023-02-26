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

const AuctionVehicleList = ({auctionId}) => {
  const dispatch = useDispatch();
  const {data = [], total = 0} = useSelector(
    ({auctions}) => auctions.auctionItemList,
  );
  const {loading} = useSelector(({common}) => common);
  const [tableData, setTableData] = useState(data);

  useEffect(() => {
    console.log(auctionId);
    fetchData(auctionId);
    setTableData(data);
  }, []);

  const fetchData = async (actionId) => {
    await dispatch(
      onGetVehicleAuctionData({
        auction_id: actionId,
      }),
    );
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
    <AppCard contentStyle={{px: 0}} sxStyle={{height: 1}}>
      {!loading ? <DealsTable dealsTableData={data} /> : <Box></Box>}
    </AppCard>
  );
};

export default AuctionVehicleList;
AuctionVehicleList.propTypes = {
  auctionId: PropTypes.any,
};
