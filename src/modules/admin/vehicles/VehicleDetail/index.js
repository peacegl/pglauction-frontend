import SaleInfo from 'components/vehicles/VehicleDetails/SaleInfo';
import LotInfo from 'components/vehicles/VehicleDetails/LotInfo';
import ImageCarousel from 'components/design/ImageCarousel';
import ItemHeader from 'components/design/ItemHeader';
import {useAuthUser} from '@crema/utility/AuthHooks';
import {useDispatch, useSelector} from 'react-redux';
import Error404 from 'modules/errorPages/Error404';
import {onGetVehicleView} from 'redux/actions';
import {Box, Container} from '@mui/material';
import {useRouter} from 'next/router';
import {useEffect} from 'react';

const VehicleDetail = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const {id} = router.query;

  const loading = useSelector(({common}) => common.loading);
  const {vehicle = {}} = useSelector(({vehicles}) => vehicles);

  const {user} = useAuthUser();

  useEffect(() => {
    if (id) {
      dispatch(onGetVehicleView(id));
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      dispatch(onGetVehicleView(id));
    }
  }, [user?.type]);

  return (
    <>
      {vehicle.id ? (
        <>
          <ItemHeader
            item={vehicle}
            admin={true}
            onBack={() => router.back()}
          />
          <Container maxWidth='xl' sx={{mt: 6}}>
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
                  <LotInfo vehicle={vehicle} admin={true} />
                </Box>
                <Box sx={{flex: 1}}>
                  <SaleInfo vehicle={vehicle} admin={true} />
                </Box>
              </Box>
            </Box>
          </Container>
        </>
      ) : (
        !loading && <Error404 url='/' />
      )}
    </>
  );
};

export default VehicleDetail;
