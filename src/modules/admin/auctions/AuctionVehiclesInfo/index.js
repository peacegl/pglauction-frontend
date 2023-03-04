import ImageCarousel from 'components/design/ImageCarousel';
import VehicleHeader from 'components/design/VehicleHeader';
import {Box, Container} from '@mui/material';
import {useState, useEffect} from 'react';
import {useRouter} from 'next/router';
import PropTypes from 'prop-types';
import BidInfoAdmin from './BidInfo';
import LotInfoAdmin from './LotInfo';

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
          <Box sx={{mr: 2, flex: 0.7}}>
            <ImageCarousel
              images={vehicle?.vehicle?.images ?? vehicle.images}
              isSold={
                vehicle?.vehicle?.status
                  ? vehicle?.vehicle?.status == 'sold'
                  : vehicle?.status == 'sold'
              }
              topCustom={'13.7%'}
              leftCustom={'42%'}
            />
            <Box sx={{flex: 1, mt: 5}}>
              <BidInfoAdmin bid={vehicle}></BidInfoAdmin>
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flex: 1,
              alignContent: 'space-between',
              columnGap: '10px',
              rowGap: '20px',
              flexDirection: {xs: 'column', sm: 'row'},
            }}
          >
            <Box sx={{flex: 1}}>
              <LotInfoAdmin
                vehicle={vehicle?.vehicle ?? vehicle}
                admin={true}
                auction_id={vehicle?.id}
              />
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
