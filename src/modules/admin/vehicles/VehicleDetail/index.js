import SaleInfo from 'components/vehicles/VehicleDetails/SaleInfo';
import LotInfo from 'components/vehicles/VehicleDetails/LotInfo';
import ImageCarousel from 'components/design/ImageCarousel';
import VehicleHeader from 'components/design/VehicleHeader';
import {useAuthUser} from '@crema/utility/AuthHooks';
import {useDispatch, useSelector} from 'react-redux';
import Error404 from 'modules/errorPages/Error404';
import {onGetAuctionItemBid, onGetVehicleView} from 'redux/actions';
import {Box, Container} from '@mui/material';
import {useRouter} from 'next/router';
import {useEffect} from 'react';
import BidInfoAdmin from 'modules/admin/auctions/AuctionVehiclesInfo/BidInfo';
import {GET_AUCTION_ITEM_BID_EMPTY} from 'shared/constants/ActionTypes';

const VehicleDetail = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const {id} = router.query;
  const loading = useSelector(({common}) => common.loading);
  const {vehicle = {}} = useSelector(({vehicles}) => vehicles);
  const {user} = useAuthUser();
  const {auctionItemBid} = useSelector(({auctions}) => auctions.auctionItemBid);

  useEffect(() => {
    if (id) {
      dispatch(onGetVehicleView(id));
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      dispatch(onGetVehicleView(id));
    }
  }, [user?.type]);

  useEffect(() => {
    if (vehicle?.bidInfo?.id != undefined) {
    }
    dispatch({type: GET_AUCTION_ITEM_BID_EMPTY});
    fetchData(vehicle?.bidInfo?.id);
  }, [vehicle?.bidInfo?.id]);

  const fetchData = async (id) => {
    console.log(id);
    await dispatch(
      onGetAuctionItemBid(id, {
        per_page: 10,
        page: 1,
        orderBy: {column: 'created_at', order: 'desc'},
      }),
    );
  };

  return (
    <>
      {vehicle.id ? (
        <>
          <VehicleHeader
            vehicle={vehicle}
            admin={true}
            onBack={() => router.back()}
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
            <Box sx={{mr: 2, flex: 1.5}}>
              <ImageCarousel
                images={vehicle.images}
                isSold={vehicle.status == 'sold'}
                hideMagnifier
              />
            </Box>
            <Box
              sx={{
                display: vehicle?.bidInfo?.id != undefined ? 'block' : 'flex',
                flex: 2,
                alignContent: 'space-between',
                columnGap: '10px',
                rowGap: '20px',
                flexDirection: {xs: 'column', sm: 'row'},
              }}
            >
              <Box sx={{flex: vehicle?.bidInfo?.id != undefined ? 2 : 1.5}}>
                <LotInfo
                  vehicle={vehicle}
                  admin={true}
                  auctionId={vehicle?.bidInfo?.auction_id}
                  auctionItemId={vehicle?.bidInfo?.id}
                  bidData={auctionItemBid}
                />
              </Box>
              <Box
                sx={{
                  flex: 1,
                  marginTop: vehicle?.bidInfo?.id != undefined ? '20px' : '0',
                }}
              >
                <SaleInfo vehicle={vehicle} admin={true} />
                {!Object.keys(vehicle.bidInfo).length == 0 ? (
                  <Box sx={{mt: 4}}>
                    <BidInfoAdmin bid={vehicle.bidInfo} />
                  </Box>
                ) : (
                  <></>
                )}
              </Box>
            </Box>
          </Box>
        </>
      ) : (
        !loading && <Error404 url='/' />
      )}
    </>
  );
};

export default VehicleDetail;
