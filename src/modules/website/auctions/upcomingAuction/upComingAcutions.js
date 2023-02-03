import {useThemeContext} from '@crema/utility/AppContextProvider/ThemeContextProvider';
import AppsContent from '../../vehicles/VehicleList/AppsContent';
import IntlMessages from '@crema/utility/IntlMessages';
import {useDispatch, useSelector} from 'react-redux';
import {useAuthUser} from '@crema/utility/AuthHooks';
import {onGetWebAuctionData} from 'redux/actions';
import React, {useEffect, useState} from 'react';
import {alpha, Box, Card} from '@mui/material';
import AuctionGrid from '../AuctionGrid';
import Header from '../Header';

const UpComingAuctions = () => {
  const dispatch = useDispatch();
  const {theme} = useThemeContext();
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const {user} = useAuthUser();
  const {data = [], total = 0} = useSelector(
    ({webAuctions}) => webAuctions.auctionsUpComingList,
  );
  const loading = useSelector(({common}) => common.loading);

  useEffect(() => {
    dispatch(
      onGetWebAuctionData({
        per_page: perPage,
        page: page + 1,
        dayData: 'up_coming',
      }),
    );
  }, [page, perPage, user?.type]);

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
            title='website.upcomingAuctions'
            list={data}
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
            mb: 4,
            height: 1,
            '& > div': {
              width: '100%',
            },
          }}
        >
          <AuctionGrid
            list={data}
            loading={loading}
            perPage={perPage}
            user={user}
            emptyTitle={<IntlMessages id='auction.noUpcommingAuction' />}
          />
        </Box>
      </AppsContent>
    </>
  );
};

export default UpComingAuctions;
