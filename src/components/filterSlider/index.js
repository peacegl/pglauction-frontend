import IntlMessages from '@crema/utility/IntlMessages';
import { Box, Button, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setBrandFilter, setWebVehiclesFilter } from 'redux/actions';
import FilterComponents from './FilterComponents';
import { useState } from 'react';
import { useRouter } from 'next/router';
const AuctionsSidebar = () => {
  const dispatch = useDispatch();
  const filterData = useSelector(({ webVehicles }) => webVehicles.filterData);
  const [resetAll, setResetAll] = useState(false);
  const router = useRouter();
  const onResetAll = () => {
    if (router.query.make !== undefined) {
      router.query = {};
    }

    setResetAll(true);
    dispatch(
      setWebVehiclesFilter({
        newly_added: {
          newly_added_duration: 24,
          newly_added: 0,
        },
        'between@@price': [0, 100000],
        'between@@odometer': [0, 250000],
        'between@@year': [1995, new Date().getFullYear()],
        model: [],
        make: [],
        engine_type: [],
        transmission: [],
        fuel: [],
        cylinder: [],
        interior_color: [],
        exterior_color: [],
        document_type: [],
        body_style: [],
        feature: [],
        drive_type: [],
        status: [],
        keys: [],
        test_drive: [],
        location_id: [],
        category_id: [],
      }),
    );
  };
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
          sx={{ fontSize: '18px', fontWeight: '500' }}
          color='primary'
        >
          <IntlMessages id='common.apply_filters' />
        </Typography>
        <Button onClick={() => onResetAll()}>
          <IntlMessages id='common.reset_all' />
        </Button>
      </Box>
      <FilterComponents
        filterData={filterData}
        resetAll={resetAll}
        setResetAll={setResetAll}
      />
    </Box>
  );
};

export default AuctionsSidebar;
AuctionsSidebar.propTypes = {};
