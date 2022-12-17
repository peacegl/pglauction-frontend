import MultipleContentSection from '../../../components/design/MultipleContentSection';
import {onGetFeaturedVehicles, onGetRecentlyAddedVehicles} from 'redux/actions';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import HighQualityIcon from '@mui/icons-material/HighQuality';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SecondCustomCarousel from '../../../components/SecondCustomCarousel';
import {green, deepOrange, blue} from '@mui/material/colors';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import IntlMessages from '@crema/utility/IntlMessages';
import {useDispatch, useSelector} from 'react-redux';
import CustomCarousel from '../../../components/CustomCarousel';
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
    title: "Leading Showroom with Variety of Cars",
    color: deepOrange[500],
    bgcolor: deepOrange[100],
    details: `We are one of the leading showrooms in Sharjah, UAE. Having started small, we are expanding quickly and providing more services to our customers so they can make profits stress-free!`,
  },
  {
    icon: <AdminPanelSettingsIcon sx={{fontSize: 35}} />,
    title: "Comprehensive Portfolia Services",
    color: (theme) => theme.palette.success.main,
    bgcolor: green[100],
    details: `We do not only provide you best selling cars but offer you our affiliates' portfolio where you can buy cars directly from USA and have a worry-free experience from dispatching, loading, shipping, clearance, and landtransport.`,
    
  },
  {
    icon: <HighQualityIcon sx={{fontSize: 35}} />,
    title: <IntlMessages id='website.quality' />,
    color: (theme) => theme.palette.info.main,
    bgcolor: blue[100],
    details: `We have a CRM Department to take our customers' issues seriously and to provide a stress and hassle free experience.`,
    link:'pglsystem.com'
  },
];

export default function Home() {
  const featuredVehicles = useSelector(
    ({webVehicles}) => webVehicles.featuredVehicles,
  );
  const recentlyAddedVehicles = useSelector(
    ({webVehicles}) => webVehicles.recentlyAddedVehicles,
  );
  const dispatch = useDispatch();
  useEffect(() => {
    fetchData();
  }, [dispatch]);

  const fetchData = async () => {
    await dispatch(onGetFeaturedVehicles());
    await dispatch(onGetRecentlyAddedVehicles());
  };

  return (
    <>
      <CarouselBanur></CarouselBanur>
      <Container maxWidth='xl' sx={{mt: 12}}>
        {featuredVehicles.length > 0 && (
          <CustomCarousel
            title={<IntlMessages id='vehicle.featuredVehicles' />}
            items={featuredVehicles}
          />
        )}
      </Container>
      <Container maxWidth='xl' sx={{mt: 10}}>
        <MultipleContentSection
          title={<IntlMessages id='website.why_choose_us' />}
          contents={contents}
        />
      </Container>
     
      <Container maxWidth='xl' sx={{mt: 10}}>
        {recentlyAddedVehicles.length > 0 && (
          <SecondCustomCarousel
            title={<IntlMessages id='vehicle.recentlyAddedVehicles' />}
            items={recentlyAddedVehicles}
          />
        )}
      </Container>
    </>
  );
}
