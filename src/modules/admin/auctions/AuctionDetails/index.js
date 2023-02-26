import ItemHeader from 'components/design/ItemHeader';
import {useAuthUser} from '@crema/utility/AuthHooks';
import Error404 from 'modules/errorPages/Error404';
import {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {Box, Typography} from '@mui/material';
import {AppLoader} from '@crema';
import {getData} from 'configs';

const AuctionDetails = () => {
  const [aucitonData, setAuctionData] = useState({});
  const [auctionItems, setAuctionItems] = useState([]);
  const [auctionItemsLoading, setAuctionItemsLoading] = useState(true);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const {id} = router.query;
  const {user} = useAuthUser();

  useEffect(() => {
    if (id) {
      getData(`/auctions/${id}`, {}, setLoading, setAuctionData);
      getData(
        `/website/auctions/${id}?per_page=50&page=1/`,
        {},
        setAuctionItemsLoading,
        setAuctionItems,
      );
    }
  }, [id]);

  console.log(auctionItems, aucitonData);
  return (
    <>
      {loading ? (
        <AppLoader />
      ) : aucitonData?.id ? (
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
                {aucitonData.name}
              </Typography>
            }
          />
        </>
      ) : (
        !loading && !aucitonData?.id && <Error404 url='/' />
      )}
    </>
  );
};

export default AuctionDetails;
