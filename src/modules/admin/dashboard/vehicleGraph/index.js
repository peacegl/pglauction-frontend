import React, {useCallback, useEffect, useState} from 'react';
import VehicleGraph from './VehicleGraph';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import IntlMessages from '../../../../@crema/utility/IntlMessages';
import {Box} from '@mui/material';
import PropTypes from 'prop-types';
import AppCard from '../../../../@crema/core/AppCard';

const Vehicle = (props) => {
  const {coinGraphData} = props;

  const onGetCoinData = useCallback(
    (coin) => {
      switch (coin) {
        case 'Bitcoin': {
          return coinGraphData.bitcoin;
        }
        default:
          return coinGraphData.bitcoin;
      }
    },
    [coinGraphData],
  );

  const [graphType, setGraphType] = useState(0);
  const [coinType, setCoinType] = useState('Bitcoin');
  const [coinData, setCoinData] = useState(onGetCoinData(coinType));

  useEffect(() => {
    setCoinData(onGetCoinData(coinType));
  }, [coinType, onGetCoinData]);

  const handleChange = (event, newValue) => {
    setGraphType(newValue);
  };
  return (
    <AppCard>
      <Box
        sx={{
          mt: -2,
          display: 'flex',
          flexDirection: {xs: 'column', md: 'row'},
          alignItems: {md: 'center'},
        }}
      >
        <Box
          sx={{
            ml: -3,
            flex: 1,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              display: 'inline-block',
              px: '32px',
              fontWeight: 'bold',
              fontSize: '18px',
            }}
          >
            <IntlMessages id='sidebar.vehicles' />
          </Box>
        </Box>
        <Box
          sx={{
            ml: {md: 'auto'},
          }}
        >
          <Tabs
            sx={{
              position: 'relative',
              '& .muiTab': {
                fontSize: 14,
                textTransform: 'capitalize',
                padding: 0,
                mx: {xs: 1, sm: 2, xl: 5},
                minWidth: 10,
              },
            }}
            value={graphType}
            onChange={handleChange}
            indicatorColor='primary'
            textColor='primary'
          >
            <Tab
              className='muiTab'
              label={<IntlMessages id='common.yearly' />}
            />
            <Tab
              className='muiTab'
              label={<IntlMessages id='common.monthly' />}
            />
            <Tab
              className='muiTab'
              label={<IntlMessages id='common.weekly' />}
            />
            <Tab
              className='muiTab'
              label={<IntlMessages id='common.today' />}
            />
          </Tabs>
        </Box>
      </Box>

      <Box
        sx={{
          ml: -3,
        }}
      >
        {graphType === 0 && (
          <VehicleGraph data={coinData?.yearlyData} value={graphType} />
        )}
        {graphType === 1 && (
          <VehicleGraph data={coinData?.monthlyData} value={graphType} />
        )}
        {graphType === 2 && (
          <VehicleGraph data={coinData?.weeklyData} value={graphType} />
        )}
        {graphType === 3 && (
          <VehicleGraph data={coinData?.dailyData} value={graphType} />
        )}
      </Box>
    </AppCard>
  );
};

export default Vehicle;

Vehicle.defaultProps = {
  coinGraphData: {
    bitcoin: {
      yearlyData: [],
      monthlyData: [],
      weeklyData: [],
      dailyData: [],
    },
  },
};

Vehicle.propTypes = {
  coinGraphData: PropTypes.object,
};
