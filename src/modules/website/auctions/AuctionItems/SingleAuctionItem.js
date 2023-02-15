import ImageCarousel from 'components/design/ImageCarousel';
import ItemHeader from 'components/design/ItemHeader';
import {Box, Container} from '@mui/material';
import SaleInfo from 'components/SaleInfo';
import {useState, useEffect} from 'react';
import LotInfo from 'components/LotInfo';
import {useRouter} from 'next/router';
import PropTypes from 'prop-types';
import BidInfo from './BidInfo';

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
        <Box sx={{mx: 3}}>
          <ItemHeader
            item={vehicle.vehicle}
            onBack={() => {
              if (back) {
                router.back();
                setBack(false);
              }
            }}
          />
        </Box>
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
              images={vehicle.vehicle.images}
              isSold={vehicle.vehicle.status == 'sold'}
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
              <LotInfo vehicle={vehicle.vehicle} />
            </Box>
            <Box sx={{flex: 1}}>
              <Box sx={{mb: 2}}>
                <SaleInfo vehicle={vehicle.vehicle} showPrice />
              </Box>
              <BidInfo vehicle={vehicle} id={id} />
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
