import {useThemeContext} from '@crema/utility/AppContextProvider/ThemeContextProvider';
import AppsContent from '../vehicles/VehicleList/AppsContent';
import {useDispatch, useSelector} from 'react-redux';
import {useAuthUser} from '@crema/utility/AuthHooks';
import {onGetWebAuctionData} from 'redux/actions';
import React, {useEffect, useState} from 'react';
import Header from '../vehicles/Header/index';
import AuctionItem from './auctionItem';
import {alpha, Box, Card} from '@mui/material';

const TodayAuctions = () => {
  const dispatch = useDispatch();
  const {theme} = useThemeContext();
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const {user} = useAuthUser();
  const {data = [], total = 0} = useSelector(
    ({webAuctions}) => webAuctions.auctionsList,
  );
  const viewType = useSelector(({webAuctions}) => webAuctions.viewType);
  // const loading = useSelector(({common}) => common.loading);

  useEffect(() => {
    dispatch(
      onGetWebAuctionData({
        per_page: perPage,
        page: page + 1,
        dayData: 'today',
      }),
    );
  }, [dispatch, page, perPage, user?.type]);

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
            title='website.todayAuctions'
            list={data}
            viewType={viewType}
            page={page}
            perPage={perPage}
            totalProducts={total}
            onPageChange={onPageChange}
            onGClick={() => {}}
            onLClick={() => {}}
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
            mb: 4,
            height: 1,
            '& > div': {
              width: '100%',
            },
          }}
        >
          <AuctionItem items={data} user={user} />
        </Box>
      </AppsContent>
    </>
  );
};

export default TodayAuctions;
