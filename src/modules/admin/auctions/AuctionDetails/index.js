import {onGetAuctionItems, onGetSingleAuctionData} from 'redux/actions';
import ItemHeader from 'components/design/ItemHeader';
import {useDispatch, useSelector} from 'react-redux';
import Error404 from 'modules/errorPages/Error404';
import {Box, Typography} from '@mui/material';
import AuctionDetail from './AuctionDetail';
import {useEffect} from 'react';
import {useRouter} from 'next/router';
import {AppLoader} from '@crema';
import ItemsData from './items';
import {useState} from 'react';

const AuctionDetails = () => {
  const {auction = {}} = useSelector(({auctions}) => auctions);
  const {loading} = useSelector(({common}) => common);
  const router = useRouter();
  const {id} = router.query;
  const dispatch = useDispatch();
  const {data = [], total = 0} = useSelector(
    ({auctions}) => auctions.auctionItemsData,
  );
  const [page, setPage] = useState(0);
  const perPage = 10;

  useEffect(() => {
    fetchItems(id);
  }, [page]);

  const fetchItems = async (id) => {
    await dispatch(
      onGetAuctionItems(id, {
        per_page: perPage,
        page: page + 1,
      }),
    );
  };

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
            <Box sx={{flex: 2, overflow: 'auto'}}>
              <ItemsData
                data={data}
                total={total}
                perPage={perPage}
                setPage={setPage}
                page={page}
              />
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
