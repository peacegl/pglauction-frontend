import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import {Box, Card, Container} from '@mui/material';
import {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import ImageCarousel from './ImageCarousel';
import Head from './Head';
import {onGetWebSimilarVehicle, onGetWebVehicleView} from 'redux/actions';
import {useDispatch, useSelector} from 'react-redux';
import {AppLoader} from '@crema';
import LotInfo from './LotInfo';
import SaleInfo from './SaleInfo';
import CustomCarousel from 'modules/CustomCarousel';
import IntlMessages from '@crema/utility/IntlMessages';

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
      {loading ? (
        <Box maxWidth='xl' sx={{height: 3 / 4}}>
          <AppLoader />
        </Box>
      ) : (
        <>
          <Head />
          <Container maxWidth='xl' sx={{mt: 2}}>
            <Box
              sx={{
                display: 'flex',
                alignContent: 'space-between',
                p: {xs: 2, md: 4},
                borderRadius: 2,
                columnGap: '5px',
                backgroundColor: 'transparent',
              }}
            >
              <Box flex={1.5}>
                <ImageCarousel images={vehicle.images} flex={2} />
              </Box>
              <Box
                flex={2}
                sx={{
                  display: 'flex',
                  alignContent: 'space-between',
                  columnGap: '2vw',
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
            <CustomCarousel
              title={<IntlMessages id='website.vehicle.similarVehicles' />}
              items={similarVehicles ? similarVehicles : []}
            />
          </Container>
        </>
      )}
    </>
  );
};

export default VehicleDetail;
