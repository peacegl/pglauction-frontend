import SaleInfo from 'modules/website/vehicles/VehicleDetail/SaleInfo';
import LotInfo from 'modules/website/vehicles/VehicleDetail/LotInfo';
import ImageCarousel from 'components/design/ImageCarousel';
import {useDispatch, useSelector} from 'react-redux';
import {useAuthUser} from '@crema/utility/AuthHooks';
import {Box, Card, Container} from '@mui/material';
import {onGetWebVehicleView} from 'redux/actions';
import Header from 'components/design/Header';
import {useState, useEffect} from 'react';
import {useRouter} from 'next/router';
import BidInfo from './BidInfo';

const SingleAuctionItem = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const {user} = useAuthUser();
  const [back, setBack] = useState(true);
  const {id} = router.query;
  const {vehicle = []} = useSelector(({webVehicles}) => webVehicles);
  const loadingItem = useSelector(({webVehicles}) => webVehicles.loadingItem);

  useEffect(() => {
    dispatch(onGetWebVehicleView(id));
  }, [id]);

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

            {loadingItem ? (
              <>loading</>
            ) : (
              vehicle.id && (
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
                </>
              )
            )}
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default SingleAuctionItem;
