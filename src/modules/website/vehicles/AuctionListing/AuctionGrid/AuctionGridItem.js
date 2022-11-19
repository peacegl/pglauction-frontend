import {Box, Divider, Button, CardActionArea} from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import IntlMessages from '@crema/utility/IntlMessages';
import CardContent from '@mui/material/CardContent';
import TimeRemainingBox from '../TimeRemainingBox';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import Card from '@mui/material/Card';
import {useRouter} from 'next/router';
import PropTypes from 'prop-types';
import Link from 'next/link';

export default function AuctionGridItem(props) {
  const router = useRouter();

  return (
    <Card sx={{borderRadius: 1}}>
      <CardActionArea
        onClick={() => router.push(`/live-auctions/${props.item.id}`)}
      >
        <CardMedia
          component='img'
          height='200'
          image={
            props.item.images.find((image) => image.type == 'main_image').path
          }
          alt='preview'
        />
        <CardContent>
          <Typography variant='body2' color='text.secondary' sx={{mb: 1}}>
            {props.item.bids_count} <IntlMessages id='bid.bids' />
          </Typography>

          <Typography gutterBottom variant='h3' component='div' color='primary'>
            {props.item.title}
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
            href={`https://wa.me/${props.item.seller.loginable.whatsapp}`}
            target='_blank'
          >
            <WhatsAppIcon sx={{mx: 2}} />
            {props.item.seller.loginable.whatsapp}
          </Button>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
AuctionGridItem.propTypes = {
  item: PropTypes.object.isRequired,
};
