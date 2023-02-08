import {useThemeContext} from '@crema/utility/AppContextProvider/ThemeContextProvider';
import AppsContent from '../../vehicles/VehicleList/AppsContent';
import IntlMessages from '@crema/utility/IntlMessages';
import {useDispatch, useSelector} from 'react-redux';
import {useAuthUser} from '@crema/utility/AuthHooks';
import {onGetWebAuctionData} from 'redux/actions';
import React, {useEffect, useState} from 'react';
import ListHeader from 'components/design/ListHeader';
import {alpha, Box} from '@mui/material';
import AuctionGrid from '../AuctionGrid';

const TodayAuctions = () => {
  const dispatch = useDispatch();
  const {theme} = useThemeContext();
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const {user} = useAuthUser();
  const {data = [], total = 0} = useSelector(
    ({webAuctions}) => webAuctions.auctionsList,
  );
  const loading = useSelector(({common}) => common.loading);
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
      <ListHeader
        title='website.todaysAuctions'
        list={data}
        page={page}
        perPage={perPage}
        totalProducts={total}
        onPageChange={onPageChange}
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
            emptyTitle={<IntlMessages id='auction.auctionList' />}
            emptyContent={<IntlMessages id='auction.noAuctionForToday' />}
          />
        </Box>
      </AppsContent>
    </>
  );
};

export default TodayAuctions;
