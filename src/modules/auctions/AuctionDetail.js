import {Box, Card, Stack} from '@mui/material';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import jwtAxios from '@crema/services/auth/jwt-auth';
import getData from '../../configs';

const AuctionDetail = (props) => {
  const [auction, setAuction] = useState({});
  const [auctionLoading, setAuctionLoading] = useState(false);
  const router = useRouter();
  const {id} = router.query;

  useEffect(() => {
    getData();
  }, [id]);

  return (
    <Stack direction={{xs: 'column', md: 'row'}} spacing={{xs: 5, md: 8}}>
      <Stack direction='row' spacing={5}>
        <Card>
          <CardMedia
            component='img'
            height='140'
            image='/static/images/cards/contemplative-reptile.jpg'
            alt='green iguana'
          />
          <CardContent>
            <Typography gutterBottom variant='h5' component='div'>
              Lizard
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
        </Card>
      </Stack>
    </Stack>
  );
};

export default AuctionDetail;
