import {Box, Divider, Button, CardActionArea} from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import IntlMessages from '@crema/utility/IntlMessages';
import CardContent from '@mui/material/CardContent';
import TimeRemainingBox from '../../modules/website/vehicles/VehicleList/TimeRemainingBox';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import Card from '@mui/material/Card';
import {useRouter} from 'next/router';
import PropTypes from 'prop-types';
import Link from 'next/link';
import {useState} from 'react';

export default function VehicleGridCard(props) {
  const router = useRouter();

  return (
    <Card sx={{borderRadius: 1}}>
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
      <CardContent zIndex='10'>
        <Typography
          gutterBottom
          variant='h3'
          component='div'
          color='primary'
          sx={{
            cursor: 'pointer',
          }}
          onClick={() =>
            props.url ? router.push(`/${props.url}/${props.item.id}`) : {}
          }
        >
          {props.item.year}-{props.item.make}
        </Typography>
        <Divider sx={{my: 2}} />
        <Box
          color='text.secondary'
          sx={{
            display: 'flex',
          }}
        >
          <Box sx={{flex: 1}}>
            <Typography
              variant='body2'
              color='text.secondary'
              sx={{textTransform: 'uppercase'}}
            >
              <IntlMessages id='bid.currentBid' />
            </Typography>
            <Box
              sx={{
                mt: 3,
                color: (theme) => theme.palette.success.main,
              }}
            >
              $
              <Box
                display='inline'
                sx={{
                  fontWeight: 'bold',
                }}
              >
                {props.item.bids_max_amount}l
              </Box>
            </Box>
          </Box>
          <Box sx={{flex: 1}}>
            <Typography
              variant='body2'
              color='text.secondary'
              sx={{textTransform: 'uppercase'}}
            >
              <IntlMessages id='bid.timeRemaining' />
            </Typography>
            <TimeRemainingBox end_date={props.item.end_date} />
          </Box>
        </Box>
        <Button
          onClick={(e) => e.stopPropagation()}
          variant='contained'
          size='small'
          sx={{mt: 2, width: '100%'}}
          href=''
          target='_blank'
        >
          <WhatsAppIcon sx={{mx: 2}} />
        </Button>
      </CardContent>
    </Card>
  );
}
VehicleGridCard.propTypes = {
  item: PropTypes.object.isRequired,
  url: PropTypes.string,
};
