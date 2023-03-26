import {Box, Container} from '@mui/material';
import React from 'react';
import TodayAuctions from './todayAuction/todayAcutions';
import UpComingAuctions from './upcomingAuction/upComingAcutions';

const index = () => {
  return (
    <Container maxWidth='xl' sx={{mt: 6}}>
      <Box
        sx={{
          display: 'flex',
        }}
      >
        <Box
          sx={{
            flex: {xs: 1, md: 2, lg: 3, xl: 3},
          }}
        >
          <TodayAuctions />
          <UpComingAuctions />
        </Box>
      </Box>
    </Container>
  );
};

export default index;
