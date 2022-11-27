import React from 'react';
import VehicleList from './VehicleList';
import AuctionsSidebar from './AuctionsSidebar';
import {Box, Card, Container} from '@mui/material';

const Vehicles = () => {
  return (
    <Container maxWidth='xl' sx={{mt: 6}}>
      <Box
        sx={{
          display: 'flex',
        }}
      >
        <Box
          sx={{
            flex: 1,
            display: {xs: 'none', md: 'block'},
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
          <VehicleList />
        </Box>
      </Box>
    </Container>
  );
};

export default Vehicles;
