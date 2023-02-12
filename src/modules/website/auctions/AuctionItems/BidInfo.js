import IntlMessages from '@crema/utility/IntlMessages';
import {useEffect, useState} from 'react';
import Item from 'components/Item';
import PropTypes from 'prop-types';
import {
  alpha,
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from '@mui/material';

export default function BidInfo({vehicle}) {
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
      <CardContent sx={{px: 3, py: 0}}>
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
          label={<IntlMessages id='bid.currentBid' />}
          value={vehicle.minimum_bid}
        />
      </CardContent>
    </Card>
  );
}
BidInfo.propTypes = {
  vehicle: PropTypes.any,
};
