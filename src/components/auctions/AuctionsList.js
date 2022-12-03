import {useState, useEffect} from 'react';
import AuctionCard from './AuctionCard';
import Grid from '@mui/material/Grid';
import {Stack} from '@mui/material';
import axios from 'axios';

const AuctionsList = () => {
  const [auctionItems, setAuctionItems] = useState([]);
  useEffect(() => {
    if (auctionItems.length == 0) {
      getAuctionItems();
    }
  }, []);
  const getAuctionItems = async () => {
    try {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_BASE_URL + 'fetchItems',
      );
      if (
        response.status == 200 &&
        response.data.result &&
        response?.data?.data?.data?.length
      ) {
        setAuctionItems(response?.data?.data?.data);
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Stack direction='row' spacing={4} sx={{flexWrap: 'wrap'}}>
      {auctionItems.map((item, index) => (
        <Grid item xs={12} sm={6} lg={3} key={index}>
          <AuctionCard item={item} />
        </Grid>
      ))}
    </Stack>
  );
};

export default AuctionsList;
