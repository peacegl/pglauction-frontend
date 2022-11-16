import IntlMessages from '@crema/utility/IntlMessages';
import CardContent from '@mui/material/CardContent';
import TimeRemainingBox from '../TimeRemainingBox';
import Typography from '@mui/material/Typography';
import {Box, Divider, Stack} from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import Card from '@mui/material/Card';
import PropTypes from 'prop-types';
export default function AuctionListItem(props) {
  return (
    <Card
      sx={{
        borderRadius: 1,
        display: 'flex',
        flexDirection: {xs: 'column', sm: 'row'},
        mb: 4,
        maxWidth: {xs: '360px', sm: '100%'},
      }}
    >
      <CardMedia
        component='img'
        sx={{
          width: {xs: '100%', sm: '220px'},
          height: {xs: '220px', sm: 'auto'},
        }}
        image={props.item.images[0].path}
        alt='preview'
      />
      <CardContent sx={{width: '100%'}}>
        <Stack direction={{xs: 'column', sm: 'row'}} spacing={5}>
          <Box sx={{flex: 1}}>
            <Typography variant='body1' color='text.secondary' sx={{mb: 1}}>
              {props.item.bids_count} <IntlMessages id='bid.bids' />
            </Typography>
            <Typography
              gutterBottom
              variant='h3'
              component='div'
              color='primary'
            >
              {props.item.title}
            </Typography>
            <Divider sx={{my: 2}} />
            <Box
              color='text.secondary'
              sx={{
                display: 'flex',
                alignSelf: 'flex-end',
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
          </Box>
          <Divider orientation='vertical' flexItem />
          <Box
            sx={{
              flex: 1,
              alignSelf: 'center',
              // display: {xs: 'none', md: 'row'},
            }}
          >
            <Typography variant='body1' color='text.secondary' sx={{mb: 2}}>
              <span style={{fontWeight: 'bold'}}>
                <IntlMessages id='bid.minimum_bid' />:
              </span>{' '}
              <Box
                sx={{
                  mt: 3,
                  display: 'inline',
                  color: (theme) => theme.palette.success.main,
                }}
              >
                $
                <span
                  display='inline'
                  style={{
                    fontWeight: 'bold',
                  }}
                >
                  {props.item.minimum_bid}
                </span>
              </Box>
            </Typography>
            <Typography variant='body1' color='text.secondary' sx={{mb: 2}}>
              <span style={{fontWeight: 'bold'}}>
                <IntlMessages id='bid.buy_now_price' />:
              </span>{' '}
              <Box
                sx={{
                  mt: 3,
                  display: 'inline',
                  color: (theme) => theme.palette.success.main,
                }}
              >
                $
                <span
                  display='inline'
                  style={{
                    fontWeight: 'bold',
                  }}
                >
                  {props.item.buy_now_price}
                </span>
              </Box>
            </Typography>
            <Typography variant='body1' color='text.secondary' sx={{mb: 2}}>
              <span style={{fontWeight: 'bold'}}>
                <IntlMessages id='common.note' />:
              </span>{' '}
              {props.item.note}
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}
AuctionListItem.propTypes = {
  item: PropTypes.object.isRequired,
};
