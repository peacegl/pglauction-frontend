import {Box, Divider, Button, CardActionArea} from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import Card from '@mui/material/Card';
import {useRouter} from 'next/router';
import PropTypes from 'prop-types';
import AppTooltip from '@crema/core/AppTooltip';

export default function VehicleGridItem(props) {
  const router = useRouter();

  return (
    <Card sx={{borderRadius: 1}}>
      <CardActionArea onClick={() => router.push(`/vehicles/${props.item.id}`)}>
        <Box height='200' overflow='hidden'>
          <CardMedia
            component='img'
            height='200'
            image={
              props.item.images.find((item) => item.type == 'main_image').path
            }
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
          <AppTooltip
            title={`${props.item?.year} ${props.item?.model.make?.name} 
            ${props.item.model?.name}`}
          >
            <Typography
              height='20px'
              gutterBottom
              variant='h4'
              component='div'
              color='primary'
              overflow='hidden'
            >
              {props.item.year} {props.item?.model.make?.name}{' '}
              {props.item.model?.name}
            </Typography>
          </AppTooltip>
          <Divider sx={{my: 2}} />
          <Typography color='primary'>AED {props.item.price}</Typography>

          <Button
            onClick={(e) => e.stopPropagation()}
            variant='contained'
            size='small'
            sx={{mt: 2, width: '100%'}}
            href='https://wa.me/+937669086'
            target='_blank'
          >
            <WhatsAppIcon sx={{mx: 2}} />
            +937669086
          </Button>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
VehicleGridItem.propTypes = {
  item: PropTypes.object.isRequired,
};
