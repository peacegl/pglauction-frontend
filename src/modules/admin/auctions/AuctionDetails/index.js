import {onGetSingleAuctionData} from 'redux/actions';
import ItemHeader from 'components/design/ItemHeader';
import {useAuthUser} from '@crema/utility/AuthHooks';
import {useDispatch, useSelector} from 'react-redux';
import Error404 from 'modules/errorPages/Error404';
import {Box, Typography} from '@mui/material';
import AuctionDetail from './AuctionDetail';
import {useEffect} from 'react';
import {useRouter} from 'next/router';
import {AppLoader} from '@crema';
import ItemsData from './items';

const AuctionDetails = () => {
  const {auction = {}} = useSelector(({auctions}) => auctions);
  const {loading} = useSelector(({common}) => common);
  const router = useRouter();
  const {id} = router.query;
  const {user} = useAuthUser();
  const dispatch = useDispatch();

  useEffect(() => {
    fetchData();
  }, [dispatch]);

  const fetchData = async () => {
    await dispatch(onGetSingleAuctionData(id));
  };

  return (
    <>
      {loading ? (
        <AppLoader />
      ) : auction?.id ? (
        <>
          <ItemHeader
            onBack={() => {
              router.back();
            }}
            title={
              <Typography
                component='h1'
                fontSize='25px'
                fontWeight='bold'
                overflow='hidden'
              >
                {auction.name}
              </Typography>
            }
          />
          <Box sx={{display: {md: 'flex'}}}>
            <Box sx={{flex: 1, mr: {md: 3}, mb: {xs: 3, md: 0}}}>
              <AuctionDetail auction={auction} />
            </Box>
            <Box sx={{flex: 2}}>
              <ItemsData id={id} />
            </Box>
          </Box>
        </>
      ) : (
        !loading && !auction?.id && <Error404 url='/' />
      )}
    </>
  );
};

export default AuctionDetails;
