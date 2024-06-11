import SaleInfo from 'components/vehicles/VehicleDetails/SaleInfo';
import LotInfo from 'components/vehicles/VehicleDetails/LotInfo';
import ImageCarousel from 'components/design/ImageCarousel';
import VehicleHeader from 'components/design/VehicleHeader';
import {Box, Container} from '@mui/material';
import {useState, useEffect} from 'react';
import {useRouter} from 'next/router';
import PropTypes from 'prop-types';
import BidInfo from './BidInfo';
import echoWeb from 'plugins/echoWeb';

const SingleAuctionItem = (props) => {
  const router = useRouter();
  const [back, setBack] = useState(true);
  const [vehicle, setVehicle] = useState({});
  const {id} = router.query;

  useEffect(() => {
    setVehicle(props.vehicle);
  }, []);

  useEffect(() => {
    echoWeb
      .channel(`web.vehicles.${props.vehicle.vehicle.id}`)
      .listen('Web', (e) => {
        if (e.action == 'updated') {
          setVehicle(e.data);
        }
      });
    return () => {
      const echoChannel = echoWeb.channel(
        `web.vehicles.${props.vehicle.vehicle.id}`,
      );
      echoChannel.stopListening('Web');
      echoWeb.leave(`web.vehicles.${props.vehicle.vehicle.id}`);
    };
  }, []);

  return (
    vehicle.id && (
      <Container maxWidth='xl'>
        <VehicleHeader
          vehicle={vehicle.vehicle ?? vehicle}
          onBack={() => {
            if (back) {
              router.back();
              setBack(false);
            }
          }}
        />
        <Box
          sx={{
            display: 'flex',
            alignContent: 'space-between',
            borderRadius: 2,
            columnGap: '10px',
            rowGap: '20px',
            backgroundColor: 'transparent',
            flexDirection: {xs: 'column', md: 'row'},
          }}
        >
          <Box sx={{mr: 2, flex: 1.5}}>
            <ImageCarousel
              images={vehicle?.vehicle?.images ?? vehicle.images}
              isSold={
                vehicle?.vehicle?.status
                  ? vehicle?.vehicle?.status == 'sold'
                  : vehicle?.status == 'sold'
              }
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              flex: 2,
              alignContent: 'space-between',
              columnGap: '10px',
              rowGap: '20px',
              flexDirection: {xs: 'column', sm: 'row'},
            }}
          >
            <Box sx={{flex: 1.5}}>
              <LotInfo vehicle={vehicle?.vehicle ?? vehicle} />
            </Box>
            <Box sx={{flex: 1}}>
              <Box sx={{mb: 2}}>
                <SaleInfo vehicle={vehicle?.vehicle ?? vehicle} />
              </Box>
              <BidInfo vehicle={vehicle} id={id} setVehicle={setVehicle} />
            </Box>
          </Box>
        </Box>
      </Container>
    )
  );
};

export default SingleAuctionItem;
SingleAuctionItem.propTypes = {
  vehicle: PropTypes.any,
};
