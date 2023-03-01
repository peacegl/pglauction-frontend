import ItemHeader from 'components/design/ItemHeader';
import {Box, Typography} from '@mui/material';
import {useRouter} from 'next/router';
import {useState} from 'react';

const AuctionVehicleInfo = () => {
  const router = useRouter();
  const {id} = router.query;
  const [back, setBack] = useState(true);

  // useEffect(() => {
  //   fetchItems(id);
  // }, [page]);

  const fetchItems = async (id) => {
    // await dispatch(
    //   onGetAuctionItems(id, {
    //     per_page: perPage,
    //     page: page + 1,
    //   }),
    // );
  };

  return (
    <>
      <>
        <ItemHeader
          onBack={() => {
            if (back) {
              router.back();
              setBack(false);
            }
          }}
          title={
            <Typography
              component='h1'
              fontSize='25px'
              fontWeight='bold'
              overflow='hidden'
            >
              nasim
            </Typography>
          }
        />
        <Box sx={{display: {md: 'flex'}}}>
          <Box sx={{flex: 1, mr: {md: 3}, mb: {xs: 3, md: 0}}}>haji</Box>
          <Box sx={{flex: 2, overflow: 'auto'}}></Box>
        </Box>
      </>
    </>
  );
};

export default AuctionVehicleInfo;
