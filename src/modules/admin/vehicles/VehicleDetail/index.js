import SaleInfo from 'components/vehicles/VehicleDetails/SaleInfo';
import LotInfo from 'components/vehicles/VehicleDetails/LotInfo';
import ImageCarousel from 'components/design/ImageCarousel';
import VehicleHeader from 'components/design/VehicleHeader';
import {useAuthUser} from '@crema/utility/AuthHooks';
import {useDispatch, useSelector} from 'react-redux';
import Error404 from 'modules/errorPages/Error404';
import {onGetVehicleView} from 'redux/actions';
import {Box, Container} from '@mui/material';
import {useRouter} from 'next/router';
import {useEffect} from 'react';
import BidInfoAdmin from 'modules/admin/auctions/AuctionVehiclesInfo/BidInfo';

const VehicleDetail = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const {id} = router.query;
  const loading = useSelector(({common}) => common.loading);
  const {vehicle = {}} = useSelector(({vehicles}) => vehicles);
  const {user} = useAuthUser();

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
                display: 'flex',
                flex: 2,
                alignContent: 'space-between',
                columnGap: '10px',
                rowGap: '20px',
                flexDirection: {xs: 'column', sm: 'row'},
              }}
            >
              <Box sx={{flex: 1.5}}>
                <LotInfo vehicle={vehicle} admin={true} />
              </Box>
              <Box sx={{flex: 1}}>
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
