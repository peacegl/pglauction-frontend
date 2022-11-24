import Container from '@mui/material/Container';
import CarouselBanur from './CarouselBanur';
import CustomCarousel from '../../CustomCarousel';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {onGetFeaturedVehicles} from 'redux/actions';
import IntlMessages from '@crema/utility/IntlMessages';
import {Button} from '@mui/material';

export default function Home() {
  const featuredVehicles = useSelector(
    ({vehicles}) => vehicles.featuredVehicles,
  );
  const dispatch = useDispatch();
  useEffect(() => {
    fetchData();
  }, [dispatch]);

  const fetchData = async () => {
    await dispatch(onGetFeaturedVehicles());
  };

  return (
    <>
      <CarouselBanur></CarouselBanur>
      <Container maxWidth='xl' sx={{mt: 6}}>
        <CustomCarousel
          title={<IntlMessages id='vehicle.featuredVehicles' />}
          items={featuredVehicles ? featuredVehicles : []}
        />
        {/* <Grid container spacing={5}>
        <Grid item xs={3}>
          <Stack direction='column' spacing={10}>
            <Box>
              <Typography variant='h5' sx={{mb: 2, ml: 1}}>
                Regions
              </Typography>
              <Divider />
              <LocationsList />
            </Box>
            <Box>
              <Typography variant='h5' sx={{mb: 2, ml: 1}}>
                Categories
              </Typography>
              <Divider />
              <CategoriesList />
            </Box>
          </Stack>
        </Grid>
        <Grid item xs={9}>
          <AuctionsList />
        </Grid>
      </Grid> */}
      </Container>
    </>
  );
}
