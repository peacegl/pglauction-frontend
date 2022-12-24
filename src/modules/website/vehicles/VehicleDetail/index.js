import {onGetWebSimilarVehicle, onGetWebVehicleView} from 'redux/actions';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import CustomCarousel from 'components/CustomCarousel';
import IntlMessages from '@crema/utility/IntlMessages';
import {useDispatch, useSelector} from 'react-redux';
import Error404 from 'modules/errorPages/Error404';
import {Box, Container} from '@mui/material';
import ImageCarousel from '../../../../components/design/ImageCarousel';
import {useRouter} from 'next/router';
import SaleInfo from './SaleInfo';
import {useEffect} from 'react';
import LotInfo from './LotInfo';
import Header from './Header';
import Head from 'next/head';

const VehicleDetail = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const {id} = router.query;

  const loading = useSelector(({common}) => common.loading);
  const {vehicle = {}} = useSelector(({webVehicles}) => webVehicles);
  const {similarVehicles = []} = useSelector(({webVehicles}) => webVehicles);

  useEffect(() => {
    if (id) {
      dispatch(onGetWebVehicleView(id));
      dispatch(onGetWebSimilarVehicle(id));
    }
  }, [id]);

  return (
    <>
      <Head>
        <meta
          property='og:title'
          content={`${vehicle.year} ${vehicle?.make} ${vehicle.model}`}
        />
        <meta
          property='og:url'
          content={`https://www.unitedtradingcars.com/all-vehicles/${vehicle.id}`}
        />
        <meta property='og:description' content='United Trading Company' />
        <meta
          property='og:image'
          content={vehicle?.images && vehicle?.images[0]?.path}
        />
      </Head>
      {loading ? (
        <Box maxWidth='xl' sx={{height: '600px'}}></Box>
      ) : vehicle.id ? (
        <>
          <Header />
          <Container maxWidth='xl' sx={{mt: 6}}>
            <Box
              sx={{
                display: 'flex',
                alignContent: 'space-between',
                borderRadius: 2,
                columnGap: '10px',
                rowGap: '20px',
                backgroundColor: 'transparent',
                flexDirection: {xs: 'column', lg: 'row'},
              }}
            >
              <Box flex={1.5}>
                <ImageCarousel
                  images={vehicle.images}
                  isSold={vehicle.status == 'sold'}
                />
              </Box>
              <Box
                flex={2}
                sx={{
                  display: 'flex',
                  alignContent: 'space-between',
                  columnGap: '10px',
                  rowGap: '20px',
                  flexDirection: {xs: 'column', sm: 'row'},
                }}
              >
                <Box flex={1.5}>
                  <LotInfo />
                </Box>
                <Box flex={1}>
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
        <Error404 url='/' />
      )}
    </>
  );
};

export default VehicleDetail;
