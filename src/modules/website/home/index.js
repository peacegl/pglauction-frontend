import {onGetFeaturedVehicles, onGetBestSellingVehicles} from 'redux/actions';
import ContactForm from '../../../components/design/ContactForm';
import SecondCustomCarousel from '../../SecondCustomCarousel';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import IntlMessages from '@crema/utility/IntlMessages';
import {useDispatch, useSelector} from 'react-redux';
import CustomCarousel from '../../CustomCarousel';
import Container from '@mui/material/Container';
import {Box, Paper, Typography} from '@mui/material';
import CarouselBanur from './CarouselBanur';
import {styled} from '@mui/material/styles';
import {useEffect, useState} from 'react';
import Button from '@mui/material/Button';

const ColorButton = styled(Button)(({theme}) => ({
  color: (theme) => theme.palette.primary.contrastText('success'),
  backgroundColor: '#128C7E',
  '&:hover': {
    backgroundColor: '#075E54',
  },
}));

export default function Home() {
  const featuredVehicles = useSelector(
    ({vehicles}) => vehicles.featuredVehicles,
  );
  const bestSellingVehicles = useSelector(
    ({vehicles}) => vehicles.bestSellingVehicles,
  );
  const dispatch = useDispatch();
  useEffect(() => {
    fetchData();
  }, [dispatch]);

  const fetchData = async () => {
    await dispatch(onGetFeaturedVehicles());
    await dispatch(onGetBestSellingVehicles());
  };

  return (
    <>
      <CarouselBanur></CarouselBanur>
      <Container maxWidth='xl' sx={{mt: 12}}>
        <CustomCarousel
          title={<IntlMessages id='vehicle.featuredVehicles' />}
          items={featuredVehicles ? featuredVehicles : []}
        />
      </Container>
      <Box
        sx={{
          my: 10,
          py: 10,
          px: 10,
          backgroundColor: (theme) => theme.palette.primary.main,
          color: (theme) => theme.palette.primary.contrastText,
        }}
      >
        <Container maxWidth='xl'>
          <Box
            sx={{
              mx: 6,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography sx={{fontSize: '28px', textTransform: 'capitalize'}}>
              <IntlMessages id='website.contact_on_whatsapp' />
            </Typography>
            <ColorButton
              variant='contained'
              size='small'
              href={`https://wa.me/0785785785`}
              target='_blank'
            >
              <WhatsAppIcon sx={{mx: 2}} />
              0785785785
            </ColorButton>
          </Box>
        </Container>
      </Box>
      <Container maxWidth='xl' sx={{mt: 10}}>
        <SecondCustomCarousel
          title={<IntlMessages id='vehicle.bestSellingVehicles' />}
          items={bestSellingVehicles ? bestSellingVehicles : []}
        />
      </Container>
      <Box variant='outlined' sqaure sx={{mt: 10}}>
        <ContactForm></ContactForm>
      </Box>
    </>
  );
}
