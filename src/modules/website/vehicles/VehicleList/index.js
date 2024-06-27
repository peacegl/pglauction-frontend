import {useThemeContext} from '@crema/utility/AppContextProvider/ThemeContextProvider';
import IntlMessages from '@crema/utility/IntlMessages';

import {useDispatch, useSelector} from 'react-redux';
import {useAuthUser} from '@crema/utility/AuthHooks';
import React, {useEffect, useState} from 'react';
import ListHeader from 'components/design/ListHeader';
import GridView from './GridView/index';
import AppsContent from './AppsContent';
import {useRouter} from 'next/router'; 

import ListView from './ListView';
import {
  onGetWebVehicleData,
  setBrandFilter,
  setVehicleViewType,
  updateRealTimeWebVehicle,
  vehicleCreated,
  vehicleCreatedCount,
  deleteRealTimeVehicle,
  onCountPopularBrands,
} from 'redux/actions';
import {
  alpha,
  Box,
  Card,
  Pagination,
  Typography,
  Select,
  MenuItem,
} from '@mui/material';
import {es} from 'date-fns/locale';
import {VIEW_TYPE} from 'redux/reducers/Auctions';

const VehicleList = () => {
  const dispatch = useDispatch();
  const {theme} = useThemeContext();
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(50);
  const [makeData, setMakeData] = useState('');
  const {user} = useAuthUser();
  const router = useRouter();
  const {make} = router.query;
  const {data = [], total = 0} = useSelector(
    ({webVehicles}) => webVehicles.vehiclesData,
  );
  const viewType = useSelector(({webVehicles}) => webVehicles.viewType);
  const filterData = useSelector(({webVehicles}) => webVehicles.filterData);
  // const loading = useSelector(({common}) => common.loading);
  const loading = useSelector(({webVehicles}) => webVehicles.itemsLoading);
  const {search = ''} = useSelector(({webVehicles}) => webVehicles);
  useEffect(() => {
    setPage(0);
  }, [search, filterData]);

  useEffect(() => {
    if (make) {
      setPage(0);
    }
    setMakeData(make ? make : '');
  }, [make]);

  useEffect(() => {
    let filterBrands = {};
    if (!make || make == makeData) {
      if (makeData) {
        filterBrands = {
          brand: makeData,
          status: ['available', 'future'],
        };
        dispatch(
          onGetWebVehicleData({
            filterData,
            filterBrands,
            per_page: perPage,
            page: page + 1,
            search,
          }),
        );
      } else {
        dispatch(
          onGetWebVehicleData({
            filterData,
            filterBrands,
            per_page: perPage,
            page: page + 1,
            search,
          }),
        );
      }
    }
    dispatch(setBrandFilter(filterBrands));

    // filterData
    // console.log(filterData,search);
  }, [makeData, page, search, perPage, user?.type, filterData]);

  const onPageChange = (event, value) => {
    setPage(value);
  };
  const onPageChange2 = (event, value) => {
    setPage(value - 1);
  };

  useEffect(() => {
    window.echo.channel(`web.vehicle`).listen('Web', (e) => {
      if (e.action == 'created') {
        vehicleReaTimeCreated(e);
      } else if (e.action == 'updated') {
        vehicleReaTimeUpdated(e?.data);
      }
      if (e.action == 'deleted') {
        deletedVehicle(e.data);
      }
    });
    return () => {
      const echoChannel = window.echo.channel(`web.vehicle`);
      echoChannel.stopListening('Web');
      window.echo.leave(`web.vehicle`);
    };
  }, [router]);

  const vehicleReaTimeCreated = async (e) => {
    if (page == 0 && e.data.status == 'available') {
      if (router.query.make == undefined) {
        await dispatch(vehicleCreated(e.data));
        return;
      } else if (
        compareStrings(
          router.query.make.toUpperCase(),
          e.data.make.toUpperCase(),
        )
      ) {
        await dispatch(vehicleCreated(e.data));
      } else {
        await dispatch(onCountPopularBrands());
      }
    } else {
      await dispatch(vehicleCreatedCount(e.data));
    }
    await dispatch(onCountPopularBrands());
  };

  const deletedVehicle = async (data) => {
    await dispatch(deleteRealTimeVehicle(data));
    await dispatch(onCountPopularBrands());
  };

  const vehicleReaTimeUpdated = async (data) => {
    await dispatch(updateRealTimeWebVehicle(data));
  };

  function compareStrings(s1, s2) {
    // This condition will return true only if s1 and s2 hold true from equality
    if (s1 == s2) {
      return true;
    }

    return false;
  }

  return (
    <>
      <ListHeader
        title='website.allVehicles'
        list={data}
        viewType={viewType}
        page={page}
        perPage={perPage}
        total={total}
        onPageChange={onPageChange}
        make={make}
        onLClick={() => dispatch(setVehicleViewType(VIEW_TYPE.LIST))}
        onGClick={() => dispatch(setVehicleViewType(VIEW_TYPE.GRID))}
      />
      <AppsContent
        style={{backgroundColor: alpha(theme.palette.background.default, 0.6)}}
      >
        <Box
          sx={{
            width: '100%',
            flex: 1,
            display: 'flex',
            py: 2,
            px: 4,
            height: 1,
            '& > div': {
              width: '100%',
            },
          }}
        >
          {viewType === VIEW_TYPE.GRID ? (
            <GridView list={data} loading={loading} perPage={perPage} />
          ) : (
            <ListView list={data} loading={loading} perPage={perPage} />
          )}
        </Box>
        {data.length > 0 && (
          <Box
            sx={{
              m: 4,
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Card
              sx={{
                px: 3,
                borderRadius: 1,
                py: 1,
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Typography variant='body1' sx={{mr: 2}}>
                  <IntlMessages id='common.rowsPerPage' />:
                </Typography>
                <Select
                  value={perPage}
                  onChange={(e) => {
                    setPerPage(parseInt(e.target.value));
                    setPage(0);
                  }}
                  autoWidth
                  size='small'
                  sx={{
                    boxShadow: 'none',
                    '.MuiOutlinedInput-notchedOutline': {border: 0},
                  }}
                >
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={25}>25</MenuItem>
                  <MenuItem value={50}>50</MenuItem>
                  <MenuItem value={100}>100</MenuItem>
                  <MenuItem value={200}>200</MenuItem>
                </Select>
              </Box>
              <Pagination
                count={Math.ceil(total / perPage)}
                page={page + 1}
                onChange={onPageChange2}
                color='primary'
              />
            </Card>
          </Box>
        )}
      </AppsContent>
    </>
  );
};

export default VehicleList;
