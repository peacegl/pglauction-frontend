import {useState, useEffect} from 'react';
import AuctionItemCard from './AuctionItemCard';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import {Stack} from '@mui/material';

const AuctionItemsList = () => {
  const [auctionItems, setAuctionItems] = useState([]);
  useEffect(() => {
    if (auctionItems.length == 0) {
      getAuctionItems();
    }
  }, []);
  const getAuctionItems = async () => {
    try {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_BASE_URL + 'auction_items',
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
          <AuctionItemCard item={item} />
        </Grid>
      ))}
    </Stack>
  );
};

export default AuctionItemsList;
