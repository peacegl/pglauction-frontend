import React from 'react';
import AuctionListing from './AuctionListing';
import AuctionsSidebar from './AuctionsSidebar';
import AppsContainer from '../../@crema/core/AppsContainer';
import {Box, alpha, Card} from '@mui/material';

const Auctions = () => {
  return (
    <Box
      sx={{
        display: 'flex',
      }}
    >
      <Box
        sx={{
          flex: 1,
        }}
      >
        <Card
          sx={{
            m: 3,
            borderRadius: 1,
          }}
        >
          <AuctionsSidebar />
        </Card>
      </Box>
      <Box
        sx={{
          flex: 4,
        }}
      >
        <AuctionListing />
      </Box>
    </Box>
  );
};

export default Auctions;
