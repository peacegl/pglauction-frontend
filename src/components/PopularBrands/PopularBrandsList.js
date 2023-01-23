import IntlMessages from '@crema/utility/IntlMessages';
import {Box, Paper, Typography} from '@mui/material';
import Benz from 'assets/vehicle_logos/benz.png';
import BMW from 'assets/vehicle_logos/bmw.png';
import Chevrolet from 'assets/vehicle_logos/chevrolet.png';
import Ford from 'assets/vehicle_logos/ford.png';
import Hyundai from 'assets/vehicle_logos/hyundai.png';
import Honda from 'assets/vehicle_logos/honda.png';
import Toyota from 'assets/vehicle_logos/toyota.png';
import Nissan from 'assets/vehicle_logos/nissan.png';
import Lexus from 'assets/vehicle_logos/lexus.png';
import Dodge from 'assets/vehicle_logos/dodge.png';
import GMC from 'assets/vehicle_logos/gmc.png';
import LandRover from 'assets/vehicle_logos/land_rover.png';
import Kia from 'assets/vehicle_logos/kia.png';
import Jeep from 'assets/vehicle_logos/jeep.png';
import Mazda from 'assets/vehicle_logos/mazda.png';
import MiniCooper from 'assets/vehicle_logos/mini_cooper.png';
import Volkswagen from 'assets/vehicle_logos/volkswagen.png';
import Title from 'components/design/Title';

const PopularBrandsList = () => {
  const popularBrands = [
    {
      key: 1,
      logo: Benz.src,
    },
    {
      key: 2,
      logo: BMW.src,
    },
    {
      key: 3,
      logo: Chevrolet.src,
    },
    {
      key: 4,
      logo: Ford.src,
    },
    {
      key: 5,
      logo: Toyota.src,
    },
    {
      key: 6,
      logo: Hyundai.src,
    },
    {
      key: 7,
      logo: Honda.src,
    },
    {
      key: 8,
      logo: Nissan.src,
    },
    {
      key: 9,
      logo: Lexus.src,
    },
    {
      key: 10,
      logo: Dodge.src,
    },
    {
      key: 11,
      logo: GMC.src,
    },
    {
      key: 12,
      logo: Jeep.src,
    },
    {
      key: 13,
      logo: LandRover.src,
    },
    {
      key: 14,
      logo: Kia.src,
    },
    {
      key: 15,
      logo: Mazda.src,
    },
    {
      key: 16,
      logo: MiniCooper.src,
    },
    {
      key: 17,
      logo: Volkswagen.src,
    },
  ];
  return (
    <Box sx={{my: 8}}>
      <Title title={<IntlMessages id='website.popularBrands' />} />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
          mx: 10,
          mt: 4,
        }}
      >
        {popularBrands.map((brand, index) => (
          <Paper variant='outlined' key={index} sx={{m: 2, pb: 2}}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: 90,
                px: 3,
                m: 1,
              }}
            >
              <Box component='img' src={brand.logo} width={70}></Box>
            </Box>
            <Typography sx={{textAlign: 'center'}}>
              <IntlMessages id='website.inStock' />{' '}
              <Typography component='span' sx={{fontWeight: 'bold'}}>
                72
              </Typography>
            </Typography>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default PopularBrandsList;
