import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Button,
} from '@mui/material';
import IntlMessages from '@crema/utility/IntlMessages';
import PropTypes from 'prop-types';

const CarouselItem = ({item}) => {
  return (
    <Card
      variant='outlined'
      sx={{
        borderRadius: 1,
        height: '100%',
        alignItems: 'stretch',
      }}
    >
      <Box overflow='hidden' sx={{cursor: 'pointer'}}>
        <CardMedia
          component='img'
          image={item.images.find((item) => item.type == 'main_image').path}
          alt='preview'
          sx={{
            transition: 'all 450ms ease-out',
            '&:hover': {
              transform: 'scale(1.2)',
            },
          }}
        />
      </Box>
      <CardContent>
        <Typography>
          {item.year} {item.model?.make?.name} {item.model?.name}
        </Typography>
        <Box sx={{display: 'flex', mt: 1, fontWeight: 'bold'}}>
          <Typography sx={{mr: 1}}>
            <IntlMessages id='common.lot' />#
          </Typography>
          <Typography color='primary'>{item.lot_number}</Typography>
        </Box>
        <Box sx={{display: 'flex', mt: 1, fontWeight: 'bold'}}>
          <Typography sx={{mr: 1}}>
            <IntlMessages id='common.location' />
          </Typography>
          <Typography color='primary'>{item.location?.name}</Typography>
        </Box>
        <Button variant='contained' sx={{mt: 2, px: 6, borderRadius: 1}}>
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
