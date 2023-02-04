import {Box, Container} from '@mui/material';
import {useState, useEffect} from 'react';

const SingleAuctionItem = () => {
  return (
    <>
      <Container maxWidth='xl' sx={{mt: 6}}>
        <Box
          sx={{
            display: 'flex',
          }}
        >
          <Box
            sx={{
              flex: {xs: 1, md: 2, lg: 3, xl: 3.7},
            }}
          >
            hey
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default SingleAuctionItem;
