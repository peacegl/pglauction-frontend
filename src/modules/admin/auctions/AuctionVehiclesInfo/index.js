import LotInfo from 'components/vehicles/VehicleDetails/LotInfo';
import ImageCarousel from 'components/design/ImageCarousel';
import VehicleHeader from 'components/design/VehicleHeader';
import {Box, Container} from '@mui/material';
import {useState, useEffect} from 'react';
import {useRouter} from 'next/router';
import PropTypes from 'prop-types';

const SingleAuctionItem = (props) => {
  const router = useRouter();
  const [back, setBack] = useState(true);
  const [vehicle, setVehicle] = useState({});
  const {id} = router.query;

  useEffect(() => {
    setVehicle(props.vehicle);
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
          <Box sx={{mr: 2, flex: 1}}>
            <ImageCarousel
              images={vehicle?.vehicle?.images ?? vehicle.images}
              isSold={
                vehicle?.vehicle?.status
                  ? vehicle?.vehicle?.status == 'sold'
                  : vehicle?.status == 'sold'
              }
              topCustom={'17%'}
              leftCustom={'50%'}
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
            <Box sx={{flex: 0.7}}>
              <LotInfo vehicle={vehicle?.vehicle ?? vehicle} />
            </Box>
            <Box sx={{flex: 1}}>bid</Box>
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
