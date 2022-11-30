import {Box, Card, Container, Button, Drawer} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import IntlMessages from '@crema/utility/IntlMessages';
import AuctionsSidebar from '../../../components/filterSlider';
import Hidden from '@mui/material/Hidden';
import VehicleList from './VehicleList';
import {useState} from 'react';

const Vehicles = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  return (
    <>
      <Container maxWidth='xl' sx={{mt: 6}}>
        <Hidden mdUp>
          <Button
            sx={{mx: 3}}
            variant='outlined'
            startIcon={<FilterListIcon />}
            aria-label='open filter'
            onClick={() => setOpenDrawer(true)}
          >
            <IntlMessages id='common.filter' />
          </Button>
        </Hidden>

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
              flex: {xs: 1, md: 2, lg: 3, xl: 3},
            }}
          >
            <VehicleList />
          </Box>
        </Box>
      </Container>
      <Drawer
        anchor='left'
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <Box sx={{width: {xs: '70vw', sm: '60vw'}}}>
          <AuctionsSidebar />
        </Box>
      </Drawer>
    </>
  );
};

export default Vehicles;
