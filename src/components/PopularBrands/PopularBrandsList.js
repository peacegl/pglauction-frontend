import MiniCooper from 'assets/vehicle_logos/mini_cooper.png';
import Volkswagen from 'assets/vehicle_logos/volkswagen.png';
import LandRover from 'assets/vehicle_logos/land_rover.png';
import Chevrolet from 'assets/vehicle_logos/chevrolet.png';
import Hyundai from 'assets/vehicle_logos/hyundai.png';
import IntlMessages from '@crema/utility/IntlMessages';
import {Box, Divider, Paper, Typography} from '@mui/material';
import Toyota from 'assets/vehicle_logos/toyota.png';
import Nissan from 'assets/vehicle_logos/nissan.png';
import Honda from 'assets/vehicle_logos/honda.png';
import Tesla from 'assets/vehicle_logos/Tesla.png';
import Lexus from 'assets/vehicle_logos/lexus.png';
import Dodge from 'assets/vehicle_logos/dodge.png';
import Mazda from 'assets/vehicle_logos/mazda.png';
import Jeep from 'assets/vehicle_logos/jeep.png';
import Benz from 'assets/vehicle_logos/benz.png';
import Ford from 'assets/vehicle_logos/ford.png';
import BMW from 'assets/vehicle_logos/bmw.png';
import GMC from 'assets/vehicle_logos/gmc.png';
import Kia from 'assets/vehicle_logos/kia.png';
import {setBrandFilter} from 'redux/actions';
import Title from 'components/design/Title';
import {ButtonBase} from '@mui/material';
import {useDispatch} from 'react-redux';
import {useRouter} from 'next/router';
import PropTypes from 'prop-types';

const PopularBrandsList = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const filterBrand = (name) => {
    dispatch(
      setBrandFilter({
        brand: name,
        status: ['available', 'future'],
      }),
    );
  };

  const popularBrands = [
    {
      key: 1,
      logo: Nissan.src,
      name: 'nissan',
    },
    {
      key: 2,
      logo: Toyota.src,
      name: 'toyota',
    },
    {
      key: 3,
      logo: Lexus.src,
      name: 'lexus',
    },
    {
      key: 4,
      logo: Hyundai.src,
      name: 'hyundai',
    },
    {
      key: 5,
      logo: Ford.src,
      name: 'ford',
    },
    {
      key: 6,
      logo: Benz.src,
      name: 'benz',
    },
    {
      key: 7,
      logo: BMW.src,
      name: 'bmw',
    },
    {
      key: 8,
      logo: Dodge.src,
      name: 'dodge',
    },
    {
      key: 9,
      logo: Kia.src,
      name: 'kia',
    },
    {
      key: 10,
      logo: Honda.src,
      name: 'honda',
    },
    {
      key: 10,
      logo: Tesla.src,
      name: 'tesla',
    },
    // {
    //   key: 10,
    //   logo: GMC.src,
    //   name: 'gmc',
    // },
    // {
    //   key: 3,
    //   logo: Chevrolet.src,
    // },
    // {
    //   key: 12,
    //   logo: Jeep.src,
    // },
    // {
    //   key: 13,
    //   logo: LandRover.src,
    // },
    // {
    //   key: 15,
    //   logo: Mazda.src,
    // },
    // {
    //   key: 16,
    //   logo: MiniCooper.src,
    // },
    // {
    //   key: 17,
    //   logo: Volkswagen.src,
    // },
  ];
  return (
    <Box sx={{my: props.small ? 5 : 8}}>
      {props.small ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Typography
            component='h2'
            sx={{
              fontSize: {
                xs: '16px',
                xl: '20px',
              },
              textAlign: 'center',
              fontWeight: 'bold',
              textTransform: 'capitalize',
            }}
          >
            <IntlMessages id='website.popularBrands' />
            <Divider
              sx={{
                my: 2,
                mx: 4,
                backgroundColor: (theme) => theme.palette.primary.main,
                borderRadius: 10,
                height: '3px',
              }}
            />
          </Typography>
        </Box>
      ) : (
        <Title title={<IntlMessages id='website.popularBrands' />} />
      )}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
          mx: props.small ? 8 : 10,
          mt: props.small ? 2 : 4,
        }}
      >
        {popularBrands.map((brand, index) => (
          <ButtonBase
            key={index}
            sx={{mx: 2, my: props.small ? 1 : 2}}
            onClick={() => {
              router.push(`/?make=${brand.name}`);
              filterBrand(brand.name);
            }}
          >
            <Paper
              variant='outlined'
              sx={{
                pb: props.small ? 1 : 2,
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: props.small ? 70 : 90,
                  px: props.small ? 1 : 3,
                  m: 1,
                }}
              >
                <Box
                  component='img'
                  src={brand.logo}
                  width={props.small ? 50 : 70}
                ></Box>
              </Box>
              <Typography sx={{textAlign: 'center', px: 1}}>
                <IntlMessages id='website.inStock' />{' '}
                <Typography component='span' sx={{fontWeight: 'bold'}}>
                  {props.popularBrandsCount[brand.name]}
                </Typography>
              </Typography>
            </Paper>
          </ButtonBase>
        ))}
      </Box>
    </Box>
  );
};

export default PopularBrandsList;
PopularBrandsList.propTypes = {
  popularBrandsCount: PropTypes.object,
  filterBrands: PropTypes.any,
  small: PropTypes.bool,
};
