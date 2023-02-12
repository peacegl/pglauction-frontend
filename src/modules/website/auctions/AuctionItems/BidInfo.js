import IntlMessages from '@crema/utility/IntlMessages';
import {useEffect, useState} from 'react';
import {moneyFormater} from 'configs';
import Item from 'components/Item';
import PropTypes from 'prop-types';
import {
  alpha,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';

export default function BidInfo({vehicle}) {
  const [bidValue, setBidValue] = useState('');
  const [bidError, setBidError] = useState(false);

  const buyNow = () => {
    //code here buy now price
    console.log(vehicle);
  };

  const bidChange = (e) => {
    setBidValue(e.target.value);
    if (parseFloat(e.target.value) < vehicle?.minimum_bid) {
      setBidError(true);
    } else {
      setBidError(false);
    }
  };

  return (
    <Card sx={{borderRadius: 1, boxShadow: 1, m: 0, minHeight: 400}}>
      <CardHeader
        sx={{
          backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.9),
          color: 'white',
          p: 3,
        }}
        title={
          <Typography
            component='div'
            fontSize='16px'
            fontWeight='bold'
            overflow='hidden'
          >
            <IntlMessages id='auction.bidInfo' />
          </Typography>
        }
      />
      <CardContent
        sx={{
          px: 3,
          py: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box>
          <Item
            label={<IntlMessages id='bid.bidStatus' />}
            value={
              vehicle.bid_status == 1
                ? 'You have set the highest bid'
                : vehicle.bid_status == 2
                ? 'Your bid is lower than the current bid'
                : "You Haven't Bid"
            }
          />
          <Item
            label={<IntlMessages id='bid.minimum_bid' />}
            value={moneyFormater(vehicle?.minimum_bid)}
          />

          <Item
            label={<IntlMessages id='bid.currentBid' />}
            value={moneyFormater(
              vehicle.bids[0]?.amount ? vehicle.bids[0]?.amount : 0,
            )}
          />

          <Item
            label={<IntlMessages id='common.buy_now_price' />}
            value={
              <Chip
                sx={{
                  px: 2,
                  textTransform: 'capitalize',
                  fontWeight: 'bold',
                  color: (theme) => theme.palette.primary.contrastText,
                  bgcolor: '#ffa834',
                  '&:hover': {
                    backgroundColor: '#c98709',
                  },
                }}
                label={moneyFormater(vehicle?.buy_now_price)}
                size='small'
                onClick={() => buyNow()}
              />
            }
          />

          <TextField
            sx={{
              mt: 12,
            }}
            fullWidth
            label={'Enter your bid value'}
            value={bidValue}
            error={bidError}
            helperText={bidError ? 'Incorrect entry.' : ''}
            onChange={(e) => bidChange(e)}
            size='small'
            type='number'
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <IntlMessages id='common.AED' />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <Button
          variant='contained'
          sx={{mt: 2, px: 6, borderRadius: 1, width: '50%'}}
          onClick={() => console.log('bid')}
        >
          <IntlMessages id='bid.bid' />
        </Button>
      </CardContent>
    </Card>
  );
}
BidInfo.propTypes = {
  vehicle: PropTypes.any,
};
