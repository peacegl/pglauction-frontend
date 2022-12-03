import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import {Box, Divider, Paper, Stack} from '@mui/material';
import {Carousel} from 'react-responsive-carousel';
import {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {getData} from '../../configs';
import {SideBySideMagnifier} from 'react-image-magnifiers';

const AuctionDetail = (props) => {
  const [auction, setAuction] = useState({});
  const [auctionLoading, setAuctionLoading] = useState(false);
  const router = useRouter();
  const {id} = router.query;

  useEffect(() => {
    if (id) {
      getData(`/auction_items/${id}`, {}, setAuctionLoading, setAuctionData);
    }
  }, [id]);

  const setAuctionData = (data) => {
    let sortedData = data;
    sortedData.images.forEach((image, index, arr) => {
      if (image.type == 'main_image') {
        arr.unshift(image);
        arr.splice(index, 1);
      }
    });
    setAuction(sortedData);
  };

  const renderCustomThumbs = () => {
    const thumbList = auction.images?.map((image, index) => (
      <picture key={index}>
        <source data-srcSet={image.path} type='image/*' />
        <img
          style={{objectFit: 'cover'}}
          key={image._id}
          src={image.path}
          alt={image.alternativeText}
          height='70'
        />
      </picture>
    ));

    return thumbList;
  };

  return (
    <Stack direction={{xs: 'column', md: 'row'}} spacing={{xs: 5, md: 8}}>
      <Stack direction='row' spacing={5}>
        <Stack direction={{xs: 'column', md: 'row'}} spacing={5}>
          <Paper
            variant='outlined'
            sx={{
              width: '600px',
              '& .control-arrow': {
                backgroundColor: (theme) => theme.palette.info.main,
              },
            }}
          >
            <Carousel
              showStatus={false}
              showIndicators={false}
              emulateTouch={true}
              renderThumbs={renderCustomThumbs}
              // dynamicHeight={true}
            >
              {auction.images?.map((item) => (
                // <div key={item.id}>
                <SideBySideMagnifier
                  key={item.id}
                  imageSrc={item.path}
                  alwaysInPlace={true}
                  fillAvailableSpace={true}
                  imageAlt='Image'
                />
                //   <img
                //     src={item.path}
                //     alt='Auction Item'
                //     className='carousel-image'
                //   />
                // </div>
              ))}
            </Carousel>
            {/* <Divider
              sx={{
                mb: 2,
              }}
            />
            <Box>d</Box> */}
          </Paper>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default AuctionDetail;
