import IntlMessages from '@crema/utility/IntlMessages';
import {Box, Button, Typography} from '@mui/material';
import {useDispatch, useSelector} from 'react-redux';
import FilterComponents from './FilterComponents';
import {setWebVehiclesFilter} from '../../redux/actions';
import {useState} from 'react';

const AuctionsSidebar = () => {
  const dispatch = useDispatch();
  const filterData = useSelector(({webVehicles}) => webVehicles.filterData);
  const [resetAll, setResetAll] = useState(false);
  const onResetAll = () => {
    setResetAll(true);
    dispatch(
      setWebVehiclesFilter({
        newly_added: {
          newly_added_duration: 24,
          newly_added: false,
        },
        price: [0, 50000],
        odometer: [0, 250000],
        year: [1995, new Date().getFullYear()],
        make: [],
        model: [],
        engine_type: [],
        transmission: [],
        fuel: [],
        cylinder: [],
        interior_color: [],
        exterior_color: [],
        document_type: [],
        body_style: [],
        drive_type: [],
        status: [],
        keys: '',
        test_drive: '',
        location: [],
        category: [],
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
          sx={{fontSize: '18px', fontWeight: '500'}}
          color='primary'
        >
          <IntlMessages id='common.apply_filters' />
        </Typography>
        <Button onClick={() => onResetAll()}>
          <IntlMessages id='common.reset_all' />
        </Button>
      </Box>
      <Box>
        <FilterComponents
          filterData={filterData}
          resetAll={resetAll}
          setResetAll={setResetAll}
        />
      </Box>
    </Box>
  );
};

export default AuctionsSidebar;
AuctionsSidebar.propTypes = {};
