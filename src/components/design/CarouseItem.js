import DefaultCarImage from 'assets/default_car_image.png';
import IntlMessages from '@crema/utility/IntlMessages';
import SoldIcon from '../../assets/icon/sold.png';
import AppTooltip from '@crema/core/AppTooltip';
import {useRouter} from 'next/router';
import {moneyFormater} from 'configs';
import PropTypes from 'prop-types';
import {useState} from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Button,
  useTheme,
} from '@mui/material';

const CarouselItem = ({item}) => {
  const router = useRouter();
  const theme = useTheme();
  const [hoverImage, setHoverImage] = useState(false);

  const viewDetails = () => {
    router.push(`/all-vehicles/${item.id}`);
  };
  return (
    <Card
      variant='outlined'
      sx={{
        borderRadius: 1,
      }}
      key={item.id}
    >
      <Box
        overflow='hidden'
        sx={{cursor: 'pointer'}}
        onClick={() => viewDetails()}
        onMouseEnter={() => setHoverImage(true)}
        onMouseLeave={() => setHoverImage(false)}
      >
        {item.status == 'sold' && (
          <Box position='relative' zIndex='100'>
            <Box
              sx={{
                position: 'absolute',
                top: 5,
                left: 5,
                transform: 'rotate(-40deg)',
              }}
              width='50px'
              component='img'
              src={SoldIcon.src}
              alt={item.name}
            />
          </Box>
        )}
        <CardMedia
          component='img'
          image={
            item.images?.find((item) => item.type == 'main_image')?.path ??
            DefaultCarImage.src
          }
          onError={(event) => (event.target.src = DefaultCarImage.src)}
          alt='preview'
          sx={{
            objectFit: 'cover',
            transition: 'all 450ms ease-out',
            transform: hoverImage ? 'scale(1.2)' : 'scale(1)',
          }}
        />
      </Box>
      <CardContent>
        <AppTooltip title={`${item?.year} ${item?.make} ${item.model}`}>
          <Typography
            noWrap
            gutterBottom
            variant='h4'
            component='h4'
            color='primary'
          >
            {item.year} {item.make} {item.model}
          </Typography>
        </AppTooltip>
        <Box sx={{display: 'flex', mt: 1, justifyContent: 'space-between'}}>
          {/* <Typography
            component='div'
            color={theme.palette.primary.main}
            overflow='hidden'
            fontWeight='bold'
          >
            {item.price ? (
              moneyFormater(
                parseInt(item.price) +
                  parseInt((item.price * item.sale_rate ?? 15) / 100),
              )
            ) : (
              <IntlMessages id='common.not_available' />
            )}
          </Typography> */}
          <Typography
            component='div'
            color={theme.palette.primary.main}
            overflow='hidden'
          >
            {item.odometer_type}
          </Typography>
        </Box>
        {/* <Box sx={{display: 'flex', mt: 1}}>
          <Typography sx={{mr: 1}}>
            <IntlMessages id='common.lot' />#
          </Typography>
          <Typography color='primary'>{item.lot_number}</Typography>
        </Box>
        <Box sx={{display: 'flex', mt: 1}}>
          <Typography sx={{mr: 1}}>
            <IntlMessages id='common.vin' />
          </Typography>
          <Typography color='primary'>{item.vin}</Typography>
        </Box>
        <Box sx={{display: 'flex', mt: 1}}>
          <Typography sx={{mr: 1}}>
            <IntlMessages id='common.location' />
          </Typography>
          <Typography color='primary'>{item.location?.name}</Typography>
        </Box> */}
        <Button
          variant='contained'
          sx={{mt: 2, px: 6, borderRadius: 1}}
          onClick={() => viewDetails()}
        >
          <IntlMessages id='common.view_details' />
        </Button>
      </CardContent>
    </Card>
  );
};

export default CarouselItem;

CarouselItem.propTypes = {
  item: PropTypes.object,
};
