import IntlMessages from '@crema/utility/IntlMessages';
import CardContent from '@mui/material/CardContent';
import TimeRemainingBox from '../TimeRemainingBox';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import {Box, Divider} from '@mui/material';
import Card from '@mui/material/Card';
import PropTypes from 'prop-types';

export default function AuctionGridItem(props) {
  return (
    <Card sx={{borderRadius: 1}}>
      <CardMedia
        component='img'
        height='200'
        image={props.item.images[0].path}
        alt='preview'
      />
      <CardContent>
        <Typography variant='body1' color='text.secondary' sx={{mb: 1}}>
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
            <Box sx={{fontSize: '12px', textTransform: 'uppercase'}}>
              <IntlMessages id='bid.currentBid' />
            </Box>
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
            <Box sx={{fontSize: '12px', textTransform: 'uppercase'}}>
              <IntlMessages id='bid.timeRemaining' />
            </Box>
            <TimeRemainingBox end_date={props.item.end_date} />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
AuctionGridItem.propTypes = {
  item: PropTypes.object.isRequired,
};
