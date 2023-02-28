import {useThemeContext} from '@crema/utility/AppContextProvider/ThemeContextProvider';
import AppsContent from '../../vehicles/VehicleList/AppsContent';
import IntlMessages from '@crema/utility/IntlMessages';
import {useDispatch, useSelector} from 'react-redux';
import {useAuthUser} from '@crema/utility/AuthHooks';
import {
  onGetWebAuctionData,
  todayAuctionRealTime,
  todayAuctionRealTimeCount,
  updateTodayAuctionItem,
} from 'redux/actions';
import React, {useEffect, useState} from 'react';
import ListHeader from 'components/design/ListHeader';
import {alpha, Box} from '@mui/material';
import AuctionGrid from '../AuctionGrid';
import WebEcho from 'plugins/echoWeb';
import moment from 'moment';

const TodayAuctions = () => {
  const dispatch = useDispatch();
  const {theme} = useThemeContext();
  const [page, setPage] = useState(0);
  const perPage = 10;
  const {user} = useAuthUser();
  const {data = [], total = 0} = useSelector(
    ({webAuctions}) => webAuctions.auctionsList,
  );
  const loading = useSelector(({common}) => common.loading);
  useEffect(() => {
    fetchData();
  }, [dispatch, page, perPage, user?.type]);
  const onPageChange = (event, value) => {
    setPage(value);
  };

  const fetchData = async () => {
    await dispatch(
      onGetWebAuctionData({
        per_page: perPage,
        page: page + 1,
        dayData: 'today',
      }),
    );
  };

  useEffect(() => {
    WebEcho();
    window.Echo.channel(`web.auction_item`).listen('Web', (e) => {
      let startTime = moment(
        e.data?.start_date,
        'YYYY-MM-DD hh:mm:ss A',
        user?.timezone ? user.timezone : 'UTC',
      )
        .tz(user?.timezone ? user.timezone : moment.tz.guess())
        .format('YYYY-MM-DD hh:mm:ss A');
      const today = moment(new Date()).format('YYYY-MM-DD hh:mm:ss A');
      if (
        moment(today).isSame(startTime, 'day') &&
        e.data?.status == 'active'
      ) {
        if (e.action == 'created') {
          newAuctionItem(e.data);
        }
      }
      if (e.action == 'updated') {
        if (
          moment(today).isSameOrBefore(startTime, 'day') &&
          e.data?.status == 'active'
        ) {
          updateAuctionItem(e.data);
        }
      }
      if (e.action == 'deleted') {
        fetchData();
      }
    });
    return () => {
      const echoChannel = window.Echo.channel(`web.auction_item`);
      echoChannel.stopListening('Web');
      Echo.leave(`web.auction_item`);
      console.log('clean up ... today');
    };
  }, []);

  const newAuctionItem = async (data) => {
    // if (page == 0) {
    await dispatch(todayAuctionRealTime(data));
    // } else {
    //   await dispatch(todayAuctionRealTimeCount(data));
    // }
  };
  const updateAuctionItem = async (data) => {
    await dispatch(updateTodayAuctionItem(data));
  };

  return (
    <>
      <ListHeader
        title='website.todaysAuctions'
        list={data}
        page={page}
        perPage={perPage}
        total={total}
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
