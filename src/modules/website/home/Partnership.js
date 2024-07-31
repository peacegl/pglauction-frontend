import {Box, Container, Stack, Typography} from '@mui/material';
import React from 'react';
function Partnership() {
  return (
    <Container maxWidth='xl' sx={{mt: 6}}>
      <Stack direction={{xs: 'column', md: 'row'}}>
        <Box >
          <Typography   
          variant='h1'
          component='h1'
          style={{fontSize: 30, marginTop: 16}}
          >
            PARTNERSHIP WITH PGL INTERNATIONAL
            </Typography>
          <p>
            PGL AutoBid is pleased to announce that now, we deal directly with
            PGL International—one of the most respected names in the field of
            shipping cars from the USA to many countries all over the world.
            This partnership makes it easy for our customers at PGL AutoBid to
            get the best services of car shipping directly from the best
            auctions in the USA.
          </p>
          <p>
            Be it a car dealer, an individual purchaser, or part of a car
            business, our cooperation with PGL International will see your car
            delivered to any destination safely and efficiently.
          </p>
          <p>
            <b>Interested in Partnering with Us?</b>
          </p>
          <p>
            Reach out today to find out how this cooperation will benefit you.
            Let PGL AutoBid and PGL International make international car
            shipping easy and efficient for you.
          </p>
        </Box>
        <Box  >
          Reach out today to find out how this cooperation will benefit you. Let
          PGL AutoBid and PGL International make international car shipping easy
          and efficient for you.
        </Box>
      </Stack>
    </Container>
  );
}

export default Partnership;
