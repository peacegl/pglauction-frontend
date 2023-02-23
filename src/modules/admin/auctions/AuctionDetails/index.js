import {useAuthUser} from '@crema/utility/AuthHooks';
import {useDispatch, useSelector} from 'react-redux';
import Error404 from 'modules/errorPages/Error404';
import {useRouter} from 'next/router';
import {Box} from '@mui/material';
import {useEffect} from 'react';
import ListHeader from 'components/design/ListHeader';

const AuctionDetails = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const {id} = router.query;
  const {user} = useAuthUser();

  return (
    <>
      {/* <ListHeader
        onBack={() => {
          if (back) {
            router.back();
          }
        }}
        title='website.saleList'
      /> */}
    </>
  );
};

export default AuctionDetails;
