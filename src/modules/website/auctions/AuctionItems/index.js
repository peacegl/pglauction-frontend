import {Box, Container, Drawer} from '@mui/material';
import AuctionsSidebar from 'components/filterSlider';
import AuctionItemList from './AuctionItemList';
import {useState, useEffect} from 'react';

const AuctionItems = () => {
  const [openDrawer, setOpenDrawer] = useState(false);

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
            <AuctionItemList />
          </Box>
        </Box>
      </Container>
      <Drawer
        anchor='left'
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <Box sx={{width: {xs: '80vw', sm: '60vw'}}}>
          <AuctionsSidebar />
        </Box>
      </Drawer>
    </>
  );
};

export default AuctionItems;
