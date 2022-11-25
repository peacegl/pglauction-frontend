import React, {useEffect, useState} from 'react';
import Header from '../Header';
import {useDispatch, useSelector} from 'react-redux';
import {VIEW_TYPE} from 'redux/reducers/AuctionItems';
import GridView from './GridView/index';

import ListView from './ListView';
import AppsContent from './AppsContent';
import {alpha, Box, Hidden, Card} from '@mui/material';
import {useThemeContext} from '@crema/utility/AppContextProvider/ThemeContextProvider';
import {onGetWebVehicleData, setFilters} from '../../../../redux/actions';
import AppsPagination from '@crema/core/AppsPagination';

const VehicleList = () => {
  const dispatch = useDispatch();
  const {theme} = useThemeContext();
  const [page, setPage] = useState(0);
  const perPage = 20;

  const {data = [], total = 0} = useSelector(
    ({webVehicles}) => webVehicles.vehiclesData,
  );
  const viewType = useSelector(({auctionItems}) => auctionItems.viewType);
  const filterData = useSelector(({auctionItems}) => auctionItems.filterData);
  const loading = useSelector(({common}) => common.loading);

  useEffect(() => {
    dispatch(
      onGetWebVehicleData({...filterData, per_page: perPage, page: page + 1}),
    );
  }, [dispatch, filterData, page]);

  const onPageChange = (event, value) => {
    setPage(value);
  };

  const searchProduct = (title) => {
    dispatch(setFilters({...filterData, title}));
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
            onSearch={searchProduct}
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
