import {useThemeContext} from '@crema/utility/AppContextProvider/ThemeContextProvider';
import {onGetWebVehicleData, setBrandFilter} from 'redux/actions';
import IntlMessages from '@crema/utility/IntlMessages';
import {VIEW_TYPE} from 'redux/reducers/AuctionItems';
import {useDispatch, useSelector} from 'react-redux';
import {useAuthUser} from '@crema/utility/AuthHooks';
import React, {useEffect, useState} from 'react';
import GridView from './GridView/index';
import AppsContent from './AppsContent';
import {useRouter} from 'next/router';
import ListView from './ListView';
import Header from '../Header';
import {
  alpha,
  Box,
  Card,
  Pagination,
  Typography,
  Select,
  MenuItem,
} from '@mui/material';

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
            // filterData,
            filterBrands,
            per_page: perPage,
            page: page + 1,
            search,
          }),
        );
      } else {
        dispatch(
          onGetWebVehicleData({
            // filterData,
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
  }, [dispatch, makeData, page, search, perPage, user?.type]);

  const onPageChange = (event, value) => {
    setPage(value);
  };
  const onPageChange2 = (event, value) => {
    setPage(value - 1);
  };
  return (
    <>
      <Card
        sx={{
          m: 3,
          borderRadius: 1,
        }}
      >
        <Box
          sx={{
            height: 60,
            display: 'flex',
            alignItems: 'center',
            padding: {
              xs: '4px 10px',
              xl: '12px 10px',
            },
          }}
          className='apps-header'
        >
          <Header
            list={data}
            viewType={viewType}
            page={page}
            perPage={perPage}
            totalProducts={total}
            onPageChange={onPageChange}
            make={make}
          />
        </Box>
      </Card>

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
