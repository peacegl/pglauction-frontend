import {useThemeContext} from '@crema/utility/AppContextProvider/ThemeContextProvider';
import AppsContent from '../../vehicles/VehicleList/AppsContent';
import IntlMessages from '@crema/utility/IntlMessages';
import ListHeader from 'components/design/ListHeader';
import {useDispatch, useSelector} from 'react-redux';
import {useAuthUser} from '@crema/utility/AuthHooks';
import {
  onGetWebAuctionData,
  upComingAuctionRealTime,
  upComingAuctionRealTimeCount,
  updateUpComingAuctionItemReaTime,
} from 'redux/actions';
import React, {useEffect, useState} from 'react';
import {alpha, Box} from '@mui/material';
import AuctionGrid from '../AuctionGrid'; 
import moment from 'moment';


const UpComingAuctions = () => {
  const dispatch = useDispatch();
  const {theme} = useThemeContext();
  const [page, setPage] = useState(0);
  const perPage = 10;
  const {user} = useAuthUser();
  const {data = [], total = 0} = useSelector(
    ({webAuctions}) => webAuctions.auctionsUpComingList,
  );
  const loading = useSelector(({common}) => common.loading);

  useEffect(() => {
    fetchData();
  }, [page, perPage, user?.type]);

  const fetchData = async () => {
    await dispatch(
      onGetWebAuctionData({
        per_page: perPage,
        page: page + 1,
        dayData: 'up_coming',
      }),
    );
  };

  const onPageChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    window.echo.channel(`web.auction_item`).listen('Web', (e) => {
      let startTime = moment(
        e.data?.start_date,
        'YYYY-MM-DD hh:mm:ss A',
        user?.timezone ? user.timezone : 'UTC',
      )
        .tz(user?.timezone ? user.timezone : moment.tz.guess())
        .format('YYYY-MM-DD hh:mm:ss A');

      const today = moment(new Date()).format('YYYY-MM-DD hh:mm:ss A');

      if (e.action == 'created') {
        if (
          !moment(today).isSame(startTime, 'day') &&
          e.data?.status == 'active'
        ) {
          newUpComingAuctionItem(e.data);
        }
      }
      if (e.action == 'updated') {
        if (
          moment(startTime).isAfter(today, 'day') &&
          e.data?.status == 'active'
        ) {
          updateUpComingAuctionItem(e.data);
        }
      }
      if (e.action == 'deleted') {
        fetchData();
      }
    });
    return () => {
      const echoChannel = window.echo.channel(`web.auction_item`);
      echoChannel.stopListening('Web');
      window.echo.leave(`web.auction_item`);
      console.log('clean up ...');
    };
  }, []);

  const newUpComingAuctionItem = async (data) => {
    // if (page == 0) {
    await dispatch(upComingAuctionRealTime(data));
    // } else {
    //   await dispatch(upComingAuctionRealTimeCount(data));
    // }
  };

  const updateUpComingAuctionItem = async (data) => {
    await dispatch(updateUpComingAuctionItemReaTime(data));
  };

  return (
    <>
      <ListHeader
        title='website.upcomingAuctions'
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
            emptyContent={<IntlMessages id='auction.noUpcommingAuction' />}
          />
        </Box>
      </AppsContent>
    </>
  );
};

export default UpComingAuctions;
