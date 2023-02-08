import SaleInfo from 'modules/website/vehicles/VehicleDetail/SaleInfo';
import LotInfo from 'modules/website/vehicles/VehicleDetail/LotInfo';
import ImageCarousel from 'components/design/ImageCarousel';
import ItemHeader from 'components/design/ItemHeader';
import {useDispatch, useSelector} from 'react-redux';
import {useAuthUser} from '@crema/utility/AuthHooks';
import {onGetWebVehicleView} from 'redux/actions';
import {Box, Container} from '@mui/material';
import {useState, useEffect} from 'react';
import {useRouter} from 'next/router';
import BidInfo from './BidInfo';

const SingleAuctionItem = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [back, setBack] = useState(true);
  const {id} = router.query;
  const {vehicle = []} = useSelector(({webVehicles}) => webVehicles);
  const loadingItem = useSelector(({webVehicles}) => webVehicles.loadingItem);

  useEffect(() => {
    dispatch(onGetWebVehicleView(id));
  }, [id]);

  return (
    <Container maxWidth='xl'>
      <Box sx={{mx: 3}}>
        <ItemHeader
          item={vehicle}
          onBack={() => {
            if (back) {
              router.back();
              setBack(false);
            }
          }}
        />
      </Box>
      {/* details */}
      {!loadingItem && vehicle.id && (
        <Container maxWidth='xl'>
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
                images={vehicle.images}
                isSold={vehicle.status == 'sold'}
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
                <LotInfo />
              </Box>
              <Box sx={{flex: 1}}>
                <Box sx={{mb: 2}}>
                  <SaleInfo />
                </Box>
                <BidInfo />
              </Box>
            </Box>
          </Box>
        </Container>
      )}
    </Container>
  );
};

export default SingleAuctionItem;
