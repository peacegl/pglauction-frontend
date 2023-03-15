import ImageCarousel from 'components/design/ImageCarousel';
import VehicleHeader from 'components/design/VehicleHeader';
import {Box, Button, Container} from '@mui/material';
import {useState, useEffect, useRef} from 'react';
import {useRouter} from 'next/router';
import PropTypes from 'prop-types';
import BidInfoAdmin from './BidInfo';
import LotInfoAdmin from './LotInfo';
import {newBidRealTime, onGetAuctionItemBid} from 'redux/actions';
import {useDispatch, useSelector} from 'react-redux';
import {
  GET_AUCTION_ITEM_BID_EMPTY,
  GET_AUCTION_ITEM_BID_IS_ACCEPTED,
} from 'shared/constants/ActionTypes';
import useSound from 'use-sound';
import {useAuthUser} from '@crema/utility/AuthHooks';
import EchoConfig from 'plugins/echo';
import WebEcho from 'plugins/echoWeb';

const SingleAuctionItem = (props) => {
  const router = useRouter();
  const [back, setBack] = useState(true);
  const [vehicle, setVehicle] = useState({});
  const {auctionItemBid} = useSelector(({auctions}) => auctions.auctionItemBid);
  const dispatch = useDispatch();
  const buttonClick = useRef();

  useEffect(() => {
    setVehicle(props.vehicle);
    buttonClick?.current?.click();
    fetchData(props.vehicle?.id);
  }, []);

  useEffect(() => {
    dispatch({type: GET_AUCTION_ITEM_BID_EMPTY});
  }, []);

  const fetchData = async (id) => {
    await dispatch(
      onGetAuctionItemBid(id, {
        per_page: 10,
        page: 1,
        orderBy: {column: 'created_at', order: 'desc'},
      }),
    );
  };
  const {user} = useAuthUser();
  const [playOn] = useSound('/assets/audio/notify.wav', {
    volume: 0.5,
  });

  useEffect(() => {
    EchoConfig();
    window.Echo.private(`update.bidData`).listen('Updated', (e) => {
      if (user.uid != e.authUser) {
        if (e.action === 'created') {
          if (e.data.auction_item_id == props.vehicle?.id) {
            buttonClick.current.click();
            addNew(e.data);
          }
        }
      }
    });
    return () => {
      const echoChannel = window.Echo.private(`update.bidData`);
      echoChannel.stopListening('Updated');
      Echo.leave(`update.bidData`);
    };
  }, []);

  const addNew = async (data) => {
    await dispatch(newBidRealTime(data));
  };

  useEffect(() => {
    WebEcho();
    window.Echo.channel(`web.bid`).listen('Web', (e) => {
      if (e.action == 'bidAccepted') {
        console.log(e.data[0] == router.query.id);
        if (e.data[0] == router.query.id) {
          dispatch({
            type: GET_AUCTION_ITEM_BID_IS_ACCEPTED,
            payload: e.data[0],
          });
          setVehicle((d) => {
            return {
              ...d,
              vehicle: {
                ...d.vehicle,
                status: 'sold',
              },
            };
          });
        }
      }
      if (e.action == 'bidCanceled') {
        if (e.data[0] == router.query.id) {
          dispatch({
            type: GET_AUCTION_ITEM_BID_IS_ACCEPTED,
            payload: '',
          });
          setVehicle((d) => {
            return {
              ...d,
              vehicle: {
                ...d.vehicle,
                status: 'available',
              },
            };
          });
        }
      }
    });
    return () => {
      const echoChannel = window.Echo.channel(`web.bid`);
      echoChannel.stopListening('Web');
      Echo.leave(`web.bid`);
    };
  }, []);

  return (
    vehicle.id && (
      <Container maxWidth='xl'>
        <Button
          sx={{display: 'none'}}
          ref={buttonClick}
          onClick={() => playOn()}
        >
          click
        </Button>
        <VehicleHeader
          vehicle={vehicle.vehicle ?? vehicle}
          onBack={() => {
            if (back) {
              router.back();
              setBack(false);
            }
          }}
        />
        <Box
          sx={{
            display: 'flex',
            alignContent: 'space-between',
            borderRadius: 2,
            columnGap: '10px',
            rowGap: '20px',
            backgroundColor: 'transparent',
            flexDirection: {xs: 'column', md: 'row'},
          }}
        >
          <Box sx={{mr: 2, flex: 0.7}}>
            <ImageCarousel
              images={vehicle?.vehicle?.images ?? vehicle.images}
              isSold={
                vehicle?.vehicle?.status
                  ? vehicle?.vehicle?.status == 'sold'
                  : vehicle?.status == 'sold'
              }
              topCustom={'13.7%'}
              leftCustom={'42%'}
            />
            <Box sx={{flex: 1, mt: 5}}>
              <BidInfoAdmin bid={vehicle}></BidInfoAdmin>
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flex: 1,
              alignContent: 'space-between',
              columnGap: '10px',
              rowGap: '20px',
              flexDirection: {xs: 'column', sm: 'row'},
            }}
          >
            <Box sx={{flex: 1}}>
              <LotInfoAdmin
                vehicle={vehicle?.vehicle ?? vehicle}
                admin={true}
                auction_id={vehicle?.id}
                bidData={auctionItemBid}
              />
            </Box>
          </Box>
        </Box>
      </Container>
    )
  );
};

export default SingleAuctionItem;
SingleAuctionItem.propTypes = {
  vehicle: PropTypes.any,
};
