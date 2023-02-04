import React, {useEffect, useState} from 'react';
import {
  alpha,
  Card,
  CardContent,
  CardHeader,
  Typography,
  useTheme,
} from '@mui/material';
import IntlMessages from '@crema/utility/IntlMessages';

export default function BidInfo() {
  const theme = useTheme();
  return (
    <Card sx={{borderRadius: 1, boxShadow: 1, m: 0, minHeight: 400}}>
      <CardHeader
        sx={{
          backgroundColor: alpha(theme.palette.primary.main, 0.9),
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
        {/* code here bid info */}
        Bidding Here 🍟
      </CardContent>
    </Card>
  );
}
