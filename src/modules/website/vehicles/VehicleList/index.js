import {useThemeContext} from '@crema/utility/AppContextProvider/ThemeContextProvider';
import AppsPagination from '@crema/core/AppsPagination';
import {alpha, Box, Hidden, Card} from '@mui/material';
import {VIEW_TYPE} from 'redux/reducers/AuctionItems';
import {useDispatch, useSelector} from 'react-redux';
import React, {useEffect, useState} from 'react';
import {onGetWebVehicleData} from 'redux/actions';
import GridView from './GridView/index';
import AppsContent from './AppsContent';
import ListView from './ListView';
import Header from '../Header';

const VehicleList = () => {
  const dispatch = useDispatch();
  const {theme} = useThemeContext();
  const [page, setPage] = useState(0);
  const perPage = 200;

  const {data = [], total = 0} = useSelector(
    ({webVehicles}) => webVehicles.vehiclesData,
  );
  const viewType = useSelector(({webVehicles}) => webVehicles.viewType);
  const filterData = useSelector(({webVehicles}) => webVehicles.filterData);
  const loading = useSelector(({common}) => common.loading);
  const {search = ''} = useSelector(({webVehicles}) => webVehicles);
  useEffect(() => {
    setPage(0);
  }, [search, filterData]);

  useEffect(() => {
    dispatch(
      onGetWebVehicleData({
        // filterData,
        per_page: perPage,
        page: page + 1,
        search,
      }),
    );
  }, [dispatch, filterData, page, search]);

  const onPageChange = (event, value) => {
    setPage(value);
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
            <GridView list={data} loading={loading} />
          ) : (
            <ListView list={data} loading={loading} />
          )}
        </Box>
      </AppsContent>
      <Hidden smUp>
        {data.length > 0 ? (
          <Card
            sx={{
              m: 3,
              borderRadius: 1,
            }}
          >
            <AppsPagination
              count={total}
              rowsPerPage={perPage}
              page={page}
              onPageChange={onPageChange}
            />
          </Card>
        ) : null}
      </Hidden>
    </>
  );
};

export default VehicleList;
