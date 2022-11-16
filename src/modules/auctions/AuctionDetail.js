import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {Box, Card, Stack} from '@mui/material';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {getData} from '../../configs';

const AuctionDetail = (props) => {
  const [auction, setAuction] = useState({});
  const [image, setImage] = useState('');
  const [auctionLoading, setAuctionLoading] = useState(false);
  const router = useRouter();
  const {id} = router.query;

  useEffect(() => {
    if (id) {
      getData(`/auctions/${id}`, {}, setAuctionLoading, setAuction);
    }
  }, [id]);

  useEffect(() => {
    if (auction) {
      let mainImage = '';
      auction.images?.forEach((image) => {
        if (image.type == 'main_image') {
          mainImage = image.path;
        }
      });
      setImage(mainImage);
    }
  }, [auction]);

  return (
    <Stack direction={{xs: 'column', md: 'row'}} spacing={{xs: 5, md: 8}}>
      <Stack direction='row' spacing={5}>
        <Card
          sx={{
            borderRadius: 1,
            width: {xs: 'auto', md: '500px'},
          }}
        >
          <CardMedia
            component='img'
            height='400'
            image={image}
            alt='green iguana'
          />
          <Box
            sx={{
              position: 'relative',
            }}
          >
            <ArrowBackIcon
              color='primary'
              sx={{
                cursor: 'pointer',
                position: 'absolute',
                top: '40%',
                left: '0',
                backgroundColor: (theme) => theme.palette.background.paper,
              }}
            />
            <CardContent>
              <Box sx={{display: 'flex', alignItems: 'center'}}>
                {auction.images?.map((item) => (
                  <CardMedia
                    key={item.id}
                    component='img'
                    height='100'
                    sx={{width: '100px', mr: 3}}
                    image={item.path}
                    alt='green iguana'
                  />
                ))}
              </Box>
            </CardContent>
            <ArrowForwardIcon
              color='primary'
              sx={{
                cursor: 'pointer',
                position: 'absolute',
                top: '40%',
                right: '0',
                backgroundColor: (theme) => theme.palette.background.paper,
              }}
            />
          </Box>
        </Card>
      </Stack>
    </Stack>
  );
};

export default AuctionDetail;
