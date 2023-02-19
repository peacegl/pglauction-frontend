import PopularBrandsList from 'components/PopularBrands/PopularBrandsList';
import {Box, Container, Drawer} from '@mui/material';
import AuctionsSidebar from 'components/filterSlider';
import {onCountPopularBrands} from 'redux/actions';
import {useState, useEffect} from 'react';
import VehicleList from './VehicleList';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import WebEcho from 'plugins/echoWeb';

const Vehicles = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const dispatch = useDispatch();
  const popularBrandsCount = useSelector(
    ({webVehicles}) => webVehicles.popularBrandsCount,
  );
  useEffect(() => {
    (async function () {
      await dispatch(onCountPopularBrands());
    })();
  }, []);

  useEffect(() => {
    WebEcho();
    window.Echo.channel(`web.vehicle`).listen('Web', (e) => {
      console.log(e, 'test');
    });
    return () => {
      const echoChannel = window.Echo.channel(`web.vehicle`);
      echoChannel.stopListening('Web');
      Echo.leave(`web.vehicle`);
    };
  }, []);

  return (
    <>
      <PopularBrandsList popularBrandsCount={popularBrandsCount} small />
      <Container maxWidth='xl' sx={{mt: 6}}>
        {/* <Hidden mdUp>
          <Button
            sx={{mx: 3}}
            variant='outlined'
            startIcon={<FilterListIcon />}
            aria-label='open filter'
            onClick={() => setOpenDrawer(true)}
          >
            <IntlMessages id='common.filter' />
          </Button>
        </Hidden> */}

        <Box
          sx={{
            display: 'flex',
          }}
        >
          {/* <Box
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
          </Box> */}
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
        <Box sx={{width: {xs: '80vw', sm: '60vw'}}}>
          <AuctionsSidebar />
        </Box>
      </Drawer>
    </>
  );
};

export default Vehicles;
