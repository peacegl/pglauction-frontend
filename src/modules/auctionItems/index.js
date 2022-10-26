import React from 'react';
import AuctionListing from './AuctionListing';
import Container from '@mui/material/Container';
import AuctionsSidebar from './AuctionsSidebar';
import AppsContainer from '../../@crema/core/AppsContainer';
import {Box, alpha, Card} from '@mui/material';

const Products = () => {
  return (
    <Container maxWidth='xl' sx={{mt: 4}}>
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
            }}
          >
            <AuctionsSidebar />
          </Card>
        </Box>
        <Box
          sx={{
            flex: 3,
          }}
        >
          <AuctionListing />
        </Box>
      </Box>
    </Container>
  );
};

export default Products;
