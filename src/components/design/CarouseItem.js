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
import {useRouter} from 'next/router';
import {useRef, useState} from 'react';
import AppTooltip from '@crema/core/AppTooltip';

const CarouselItem = ({item}) => {
  const router = useRouter();
  const cardRef = useRef();
  const [height, setHeight] = useState(null);

  window.addEventListener('resize', () => {
    if (height != parseInt((cardRef.current?.clientWidth / 4) * 3)) {
      setHeight(parseInt((cardRef.current?.clientWidth / 4) * 3));
      console.log(height);
    }
  });

  const viewDetails = () => {
    router.push(`/all-vehicles/${item.id}`);
  };
  return (
    <Card
      ref={cardRef}
      variant='outlined'
      sx={{
        borderRadius: 1,
      }}
      key={item.id}
    >
      <Box overflow='hidden' height={height} sx={{cursor: 'pointer'}}>
        <CardMedia
          onClick={() => viewDetails()}
          component='img'
          image={item.images.find((item) => item.type == 'main_image').path}
          alt='preview'
          sx={{
            height: height + 'px !important',
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
          title={`${item?.year} ${item?.model.make?.name} 
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
