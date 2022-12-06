import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import {Box, Divider, Paper, Stack} from '@mui/material';
import {Carousel} from 'react-responsive-carousel';
import {SideBySideMagnifier} from 'react-image-magnifiers';
import {PropTypes} from 'prop-types';

const ImageCarousel = ({images, ...rest}) => {
  const renderCustomThumbs = () => {
    const thumbList = images?.map((image, index) => (
      <Box
        component='img'
        style={{objectFit: 'cover'}}
        key={image._id}
        src={image.path}
        alt={image.alternativeText}
        height='70'
      />
      // <picture key={index}>
      //   <source data-srcSet={image.path} type='image/*' />
      //   <img
      //     style={{objectFit: 'cover'}}
      //     key={image._id}
      //     src={image.path}
      //     alt={image.alternativeText}
      //     height='70'
      //   />
      // </picture>
    ));

    return thumbList;
  };

  return (
    <Stack direction={{xs: 'column', md: 'row'}} spacing={{xs: 5, md: 8}}>
      <Stack direction='row' spacing={5}>
        <Stack
          direction={{xs: 'column', md: 'row'}}
          spacing={5}
          width='100%'
          sx={{maxWidth: {xs: '100%', md: '650px'}}}
        >
          <Paper
            variant='outlined'
            sx={{
              width: '100%',
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
            >
              {images?.map((item) => (
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
          </Paper>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ImageCarousel;

ImageCarousel.propTypes = {
  images: PropTypes.array,
};
