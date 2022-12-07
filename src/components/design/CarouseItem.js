import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Button,
  useTheme,
} from '@mui/material';
import IntlMessages from '@crema/utility/IntlMessages';
import PropTypes from 'prop-types';
import {useRouter} from 'next/router';
import AppTooltip from '@crema/core/AppTooltip';
import {moneyFormater} from 'configs';

const CarouselItem = ({item}) => {
  const router = useRouter();
  const theme = useTheme();

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
      <Box overflow='hidden' sx={{cursor: 'pointer'}}>
        <CardMedia
          onClick={() => viewDetails()}
          component='img'
          image={item.images?.find((item) => item.type == 'main_image').path}
          alt='preview'
          sx={{
            objectFit: 'cover',
            transition: 'all 450ms ease-out',
            '&:hover': {
              transform: 'scale(1.2)',
            },
          }}
        />
      </Box>
      <CardContent>
        <AppTooltip
          title={`${item?.year} ${item?.model?.make?.name} 
            ${item.model?.name}`}
        >
          <Typography
            noWrap
            gutterBottom
            variant='h4'
            component='h4'
            color='primary'
          >
            {item.year} {item.model?.make?.name} {item.model?.name}
          </Typography>
        </AppTooltip>
        <Box sx={{display: 'flex', mt: 1, justifyContent: 'space-between'}}>
          <Typography
            component='div'
            color={theme.palette.primary.main}
            overflow='hidden'
            fontWeight='bold'
          >
            {item.price ? (
              moneyFormater(item.price)
            ) : (
              <IntlMessages id='common.not_available' />
            )}
          </Typography>
          <Typography
            component='div'
            color={theme.palette.primary.main}
            overflow='hidden'
          >
            {item.odometer} <IntlMessages id='common.miles' />
          </Typography>
        </Box>
        <Box sx={{display: 'flex', mt: 1}}>
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
        </Box>
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
