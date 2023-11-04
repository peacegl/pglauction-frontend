import MultipleContentSection from 'components/design/MultipleContentSection';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PopularBrandsList from 'components/PopularBrands/PopularBrandsList';
import SecondCustomCarousel from 'components/SecondCustomCarousel';
import HighQualityIcon from '@mui/icons-material/HighQuality';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { green, deepOrange, blue } from '@mui/material/colors';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import IntlMessages from '@crema/utility/IntlMessages';
import { useDispatch, useSelector } from 'react-redux';
import CustomCarousel from 'components/CustomCarousel';
import Container from '@mui/material/Container';
import { Box, Paper, Typography } from '@mui/material';
import CarouselBanur from './CarouselBanur';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import {
  onCountPopularBrands,
  onGetFeaturedVehicles,
  onGetRecentlyAddedVehicles,
} from 'redux/actions';

const ColorButton = styled(Button)(({ theme }) => ({
  color: (theme) => theme.palette.primary.contrastText('success'),
  backgroundColor: '#128C7E',
  '&:hover': {
    backgroundColor: '#075E54',
  },
}));
const contents = [
  {
    icon: <EmojiEventsIcon sx={{ fontSize: 35 }} />,
    title: 'Est cillum reprehenderit aliquip.',
    color: deepOrange[500],
    bgcolor: deepOrange[100],
    details: ``,
    details: (
      <Typography component='p'>
        Dolore incididunt minim aliqua sint enim. Labore magna duis et ea
        proident ullamco consectetur occaecat. Eiusmod Lorem id mollit ut
        ullamco anim elit ipsum officia incididunt exercitation. Id duis nostrud
        esse magna ipsum ea qui dolor. Aliqua deserunt est culpa esse aliqua
        velit voluptate nostrud.
      </Typography>
    ),
  },
  {
    icon: <AdminPanelSettingsIcon sx={{ fontSize: 35 }} />,
    title: 'Est cillum reprehenderit aliquip.',
    color: (theme) => theme.palette.success.main,
    bgcolor: green[100],
    details: (
      <Typography component='p'>
        Dolore incididunt minim aliqua sint enim. Labore magna duis et ea
        proident ullamco consectetur occaecat. Eiusmod Lorem id mollit ut
        ullamco anim elit ipsum officia incididunt exercitation. Id duis nostrud
        esse magna ipsum ea qui dolor. Aliqua deserunt est culpa esse aliqua
        velit voluptate nostrud.
      </Typography>
    ),
  },
  {
    icon: <HighQualityIcon sx={{ fontSize: 35 }} />,
    title: 'Est cillum reprehenderit aliquip.',
    color: (theme) => theme.palette.info.main,
    bgcolor: blue[100],
    details: (
      <Typography component='p'>
        Dolore incididunt minim aliqua sint enim. Labore magna duis et ea
        proident ullamco consectetur occaecat. Eiusmod Lorem id mollit ut
        ullamco anim elit ipsum officia incididunt exercitation. Id duis nostrud
        esse magna ipsum ea qui dolor. Aliqua deserunt est culpa esse aliqua
        velit voluptate nostrud.
      </Typography>
    ),
  },
];

export default function Home() {
  const featuredVehicles = useSelector(
    ({ webVehicles }) => webVehicles.featuredVehicles,
  );
  const recentlyAddedVehicles = useSelector(
    ({ webVehicles }) => webVehicles.recentlyAddedVehicles,
  );
  const popularBrandsCount = useSelector(
    ({ webVehicles }) => webVehicles.popularBrandsCount,
  );

  const dispatch = useDispatch();
  useEffect(() => {
    fetchData();
  }, [dispatch]);

  const fetchData = async () => {
    await dispatch(onCountPopularBrands());
    await dispatch(onGetFeaturedVehicles());
    await dispatch(onGetRecentlyAddedVehicles());
  };

  return (
    <>
      <CarouselBanur></CarouselBanur>
      <Container maxWidth='xl' sx={{ mt: 12 }}>
        {featuredVehicles.length > 0 && (
          <CustomCarousel
            title={<IntlMessages id='vehicle.featuredVehicles' />}
            items={featuredVehicles}
          />
        )}
        <MultipleContentSection
          title={<IntlMessages id='website.why_choose_us' />}
          contents={contents}
        />
        {recentlyAddedVehicles.length > 0 && (
          <SecondCustomCarousel
            title={<IntlMessages id='vehicle.recentlyAddedVehicles' />}
            items={recentlyAddedVehicles}
          />
        )}
        <PopularBrandsList popularBrandsCount={popularBrandsCount} />
      </Container>
    </>
  );
}
