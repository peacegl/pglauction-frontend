import IntlMessages from '@crema/utility/IntlMessages';
import {Box, Button, Typography} from '@mui/material';
import {useDispatch, useSelector} from 'react-redux';
import FilterComponents from './FilterComponents';
import React, {useEffect, useState} from 'react';
import {setWebVehiclesFilter} from '../../redux/actions';
import PropTypes from 'prop-types';

const AuctionsSidebar = () => {
  const filterData = useSelector(({webVehicles}) => webVehicles.filterData);

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          m: 2,
        }}
      >
        <Typography
          component='h3'
          sx={{fontSize: '18px', fontWeight: '500'}}
          color='primary'
        >
          <IntlMessages id='common.apply_filters' />
        </Typography>
        <Button onClick={() => {}}>
          <IntlMessages id='common.reset_all' />
        </Button>
      </Box>
      <Box>
        <FilterComponents filterData={filterData} />
      </Box>
    </Box>
  );
};

export default AuctionsSidebar;
AuctionsSidebar.propTypes = {};
