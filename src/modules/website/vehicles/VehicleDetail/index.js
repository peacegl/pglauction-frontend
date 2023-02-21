import PopularBrandsList from 'components/PopularBrands/PopularBrandsList';
import SaleInfo from 'components/vehicles/VehicleDetails/SaleInfo';
import LotInfo from 'components/vehicles/VehicleDetails/LotInfo';
import ImageCarousel from 'components/design/ImageCarousel';
import CustomCarousel from 'components/CustomCarousel';
import IntlMessages from '@crema/utility/IntlMessages';
import ItemHeader from 'components/design/ItemHeader';
import {useAuthUser} from '@crema/utility/AuthHooks';
import {useDispatch, useSelector} from 'react-redux';
import {Box, Container} from '@mui/material';
import {useRouter} from 'next/router';
import {useEffect} from 'react';
import {
  onCountPopularBrands,
  onGetWebSimilarVehicle,
  onGetWebVehicleView,
} from 'redux/actions';
import WebEcho from 'plugins/echoWeb';
import {GET_WEB_VEHICLE_VIEW} from 'shared/constants/ActionTypes';

const VehicleDetail = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const {id} = router.query;
  const {vehicle = {}} = useSelector(({webVehicles}) => webVehicles);
  const {similarVehicles = []} = useSelector(({webVehicles}) => webVehicles);
  const {user} = useAuthUser();
  const popularBrandsCount = useSelector(
    ({webVehicles}) => webVehicles.popularBrandsCount,
  );
  useEffect(() => {
    if (vehicle?.id) {
      (async function () {
        await dispatch(onCountPopularBrands());
      })();
    }
  }, [vehicle?.id]);

  useEffect(() => {
    if (user?.type) {
      dispatch(onGetWebVehicleView(id));
    }
  }, [id, user?.type]);

  useEffect(() => {
    if (id) {
      dispatch(onGetWebSimilarVehicle(id));
    }
  }, [id]);

  useEffect(() => {
    WebEcho();
    window.Echo.channel(`web.vehicles.${id}`).listen('Web', (e) => {
      if (e.action == 'updated') {
        dispatch({
          type: GET_WEB_VEHICLE_VIEW,
          payload: e.data,
        });
      }
    });
    return () => {
      const echoChannel = window.Echo.channel(`web.vehicles.${id}`);
      echoChannel.stopListening('Web');
      Echo.leave(`web.vehicles.${id}`);
    };
  }, []);

  useEffect(() => {
    WebEcho();
    window.Echo.channel(`web.vehicles`).listen('Web', (e) => {
      if (e.action == 'deleted' && e?.data?.includes(id)) {
        router.push('/');
      }
    });
    return () => {
      const echoChannel = window.Echo.channel(`web.vehicles`);
      echoChannel.stopListening('Web');
      Echo.leave(`web.vehicles`);
    };
  }, []);

  return (
    <>
      {vehicle.id && (
        <Container maxWidth='xl'>
          <ItemHeader
            item={vehicle}
            admin={false}
            onBack={() => router.push('/')}
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
                <LotInfo vehicle={vehicle} />
              </Box>
              <Box sx={{flex: 1}}>
                <SaleInfo vehicle={vehicle} />
              </Box>
            </Box>
          </Box>
          <Box sx={{mt: 12}}>
            {similarVehicles.length > 0 && (
              <CustomCarousel
                title={<IntlMessages id='website.vehicle.similarVehicles' />}
                items={similarVehicles}
              />
            )}
          </Box>
          <PopularBrandsList popularBrandsCount={popularBrandsCount} />
        </Container>
      )}
    </>
  );
};

export default VehicleDetail;
