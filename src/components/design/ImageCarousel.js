import {Box, Paper, Stack} from '@mui/material';
import SoldIcon from 'assets/icon/sold.png';
import {PropTypes} from 'prop-types';
import ImageMagnifier from './ImageMagnifier';
import {useRef, useState} from 'react';
import Slider from 'react-slick';
import CustomSlider from './Slider';

const ImageCarousel = ({images, isSold = false, ...rest}) => {
  const [activeImage, setActiveImage] = useState(0);
  const sliderRef = useRef(null);

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
              {!rest.hideMagnifier ? (
                <ImageMagnifier
                  src={images[activeImage].path}
                  showPrev={activeImage != 0}
                  showNext={images.length - 1 != activeImage}
                  onPrev={() =>
                    activeImage != 0 && setActiveImage((d) => d - 1)
                  }
                  onNext={() =>
                    images.length - 1 != activeImage &&
                    setActiveImage((d) => d + 1)
                  }
                />
              ) : (
                <Box
                  component='img'
                  src={images[activeImage].path}
                  alt='img'
                  width='100%'
                />
              )}
            </Box>
            <CustomSlider>
              <Slider ref={sliderRef} className='slideRoot' {...settings}>
                {images.map((item, index) => (
                  <Box
                    onClick={() => setActiveImage(index)}
                    key={item.id}
                    component='img'
                    src={item.path}
                    alt='Image'
                  />
                ))}
              </Slider>
            </CustomSlider>
          </Paper>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ImageCarousel;

ImageCarousel.propTypes = {
  images: PropTypes.array,
  isSold: PropTypes.bool,
  hideMagnifier: PropTypes.bool,
};
