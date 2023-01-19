import {onGetWebSimilarVehicle, onGetWebVehicleView} from 'redux/actions';
import ImageCarousel from 'components/design/ImageCarousel';
import CustomCarousel from 'components/CustomCarousel';
import IntlMessages from '@crema/utility/IntlMessages';
import {useAuthUser} from '@crema/utility/AuthHooks';
import {useDispatch, useSelector} from 'react-redux';
import Error404 from 'modules/errorPages/Error404';
import {Box, Container} from '@mui/material';
import {useRouter} from 'next/router';
import SaleInfo from './SaleInfo';
import {useEffect} from 'react';
import LotInfo from './LotInfo';
import Header from './Header';

const VehicleDetail = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const {id} = router.query;

  const loading = useSelector(({common}) => common.loading);
  const {vehicle = {}} = useSelector(({webVehicles}) => webVehicles);
  const {similarVehicles = []} = useSelector(({webVehicles}) => webVehicles);
  const {user} = useAuthUser();

  useEffect(() => {
    if (id) {
      dispatch(onGetWebVehicleView(id));
      dispatch(onGetWebSimilarVehicle(id));
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      dispatch(onGetWebVehicleView(id));
    }
  }, [user?.type]);
  return (
    <>
      {loading || vehicle.id ? (
        <>
          <Header item={vehicle} />
          <Container maxWidth='xl' sx={{mt: 6}}>
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
                  <LotInfo />
                </Box>
                <Box sx={{flex: 1}}>
                  <SaleInfo />
                </Box>
              </Box>
            </Box>
          </Container>
          <Container maxWidth='xl' sx={{mt: 12}}>
            {similarVehicles.length > 0 && (
              <CustomCarousel
                title={<IntlMessages id='website.vehicle.similarVehicles' />}
                items={similarVehicles}
              />
            )}
          </Container>
        </>
      ) : (
        !loading && <Error404 url='/' />
      )}
    </>
  );
};

export default VehicleDetail;
