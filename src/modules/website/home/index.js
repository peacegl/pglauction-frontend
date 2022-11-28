import MultipleContentSection from '../../../components/design/MultipleContentSection';
import {onGetFeaturedVehicles, onGetBestSellingVehicles} from 'redux/actions';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import HighQualityIcon from '@mui/icons-material/HighQuality';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SecondCustomCarousel from '../../SecondCustomCarousel';
import {green, deepOrange, blue} from '@mui/material/colors';
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
const contents = [
  {
    icon: <EmojiEventsIcon sx={{fontSize: 35}} />,
    title: <IntlMessages id='website.moreThan500Vehicle' />,
    color: deepOrange[500],
    bgcolor: deepOrange[100],
    details: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.`,
  },
  {
    icon: <AdminPanelSettingsIcon sx={{fontSize: 35}} />,
    title: <IntlMessages id='website.simple_fast_secure' />,
    color: (theme) => theme.palette.success.main,
    bgcolor: green[100],
    details: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.`,
  },
  {
    icon: <HighQualityIcon sx={{fontSize: 35}} />,
    title: <IntlMessages id='website.quality' />,
    color: (theme) => theme.palette.info.main,
    bgcolor: blue[100],
    details: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's`,
  },
];

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
      <Container maxWidth='xl' sx={{mt: 10}}>
        <MultipleContentSection
          title={<IntlMessages id='website.why_choose_us' />}
          contents={contents}
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
              flexDirection: {xs: 'column', sm: 'row'},
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography
              sx={{
                fontSize: '28px',
                textTransform: 'capitalize',
                textAlign: 'center',
              }}
            >
              <IntlMessages id='website.contact_on_whatsapp' />
            </Typography>
            <ColorButton
              sx={{mt: {xs: 5, sm: 'inherit'}}}
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
    </>
  );
}
