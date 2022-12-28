import DefaultCarImage from 'assets/default_car_image.png';
import {Box, Card, Grid, Paper} from '@mui/material';
import ImageMagnifier from './ImageMagnifier';
import SoldIcon from 'assets/icon/sold.png';
import CustomSlider from './CustomSlider';
import {PropTypes} from 'prop-types';
import Slider from 'react-slick';
import {useState} from 'react';

const ImageCarousel = ({images, isSold = false, ...rest}) => {
  const [activeImage, setActiveImage] = useState(0);

  const settings = {
    dots: false,
    infinite: false,
    lazyLoad: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <Paper
      variant='outlined'
      sx={{
        '& .control-arrow': {
          backgroundColor: (theme) => theme.palette.info.main,
        },
      }}
    >
      {isSold && (
        <Box position='relative' zIndex='100'>
          <Box
            sx={{
              position: 'absolute',
              top: 5,
              left: 5,
              transform: 'rotate(-40deg)',
            }}
            width='45px'
            component='img'
            src={SoldIcon.src}
            alt='sold icon'
          />
        </Box>
      )}
      <Box>
        {!rest.hideMagnifier && images.length ? (
          <ImageMagnifier
            src={
              images[activeImage]?.path
                ? images[activeImage]?.path
                : DefaultCarImage.src
            }
            showPrev={activeImage != 0}
            showNext={images.length ? images.length - 1 != activeImage : false}
            onPrev={() => activeImage != 0 && setActiveImage((d) => d - 1)}
            onNext={() =>
              images.length - 1 != activeImage && setActiveImage((d) => d + 1)
            }
          />
        ) : (
          <Box
            component='img'
            src={
              images[activeImage]?.path
                ? images[activeImage]?.path
                : DefaultCarImage.src
            }
            alt='img'
            width='100%'
          />
        )}
      </Box>
      <Box>
        <Grid
          container
          spacing={{xs: 2, md: 3}}
          columns={{xs: 12, sm: 12, md: 12, lg: 10}}
          sx={{px: 1}}
        >
          {images.map((item, index) => (
            <Grid item xs={3} sm={2} md={3} lg={2} key={index}>
              <Box
                sx={{maxWidth: '100%'}}
                onClick={() => setActiveImage(index)}
                key={item.id}
                component='img'
                src={item.path}
                alt='Image'
              />
            </Grid>
          ))}
        </Grid>

        {/* <CustomSlider>
          <Slider className='slideRoot' {...settings}>
            {images.map((item, index) => (
              <Box
                sx={{maxWidth: '100px'}}
                onClick={() => setActiveImage(index)}
                key={item.id}
                component='img'
                src={item.path}
                alt='Image'
              />
            ))}
          </Slider>
        </CustomSlider> */}
      </Box>
    </Paper>
  );
};

export default ImageCarousel;

ImageCarousel.propTypes = {
  images: PropTypes.array,
  isSold: PropTypes.bool,
  hideMagnifier: PropTypes.bool,
};
