import {useAuthUser} from '@crema/utility/AuthHooks';
import {Box, Card, Container} from '@mui/material';
import ImageCarousel from 'components/design/ImageCarousel';
import SaleInfo from 'modules/website/vehicles/VehicleDetail/LotInfo';
import LotInfo from 'modules/website/vehicles/VehicleDetail/SaleInfo';
import {useRouter} from 'next/router';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {onGetWebVehicleView} from 'redux/actions';
import Header from '../Header';
import HeaderVehicle from 'modules/website/vehicles/VehicleDetail/Header';

const SingleAuctionItem = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const {user} = useAuthUser();
  const [back, setBack] = useState(true);
  const {id} = router.query;
  const {vehicle = []} = useSelector(({webVehicles}) => webVehicles);

  useEffect(() => {
    dispatch(onGetWebVehicleView(id));
  }, [id]);

  console.log(id);

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
            <Card
              sx={{
                m: 3,
                borderRadius: 1,
              }}
            >
              <Box
                sx={{
                  height: 60,
                  display: 'flex',
                  alignItems: 'center',
                  padding: {
                    xs: '4px 10px',
                    xl: '12px 10px',
                  },
                }}
                className='apps-header'
              >
                <Header
                  onBack={() => {
                    if (back) {
                      history.back();
                      setBack(false);
                    }
                  }}
                  preTitle={`${vehicle?.year} ${vehicle?.make} ${vehicle?.model}`}
                  title=' '
                  list={vehicle}
                  page={0}
                  perPage={0}
                  totalProducts={0}
                  onPageChange={() => {}}
                />
              </Box>
            </Card>

            {/* details */}

            {vehicle.id && (
              <>
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
                      <Box sx={{flex: 1}}>
                        <SaleInfo />
                      </Box>
                      <Box sx={{flex: 1.5}}>
                        <LotInfo />
                      </Box>
                    </Box>
                  </Box>
                </Container>
              </>
            )}
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default SingleAuctionItem;
