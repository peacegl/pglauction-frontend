import VehicleGridCard from 'components/vehicles/VehicleGridCard';
import {Grid, IconButton, Box} from '@mui/material';
import CourseSlider from './CourseSlider';
import CarouselItem from '../design/CarouseItem';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import {useRef, useEffect} from 'react';

const CustomCarousel = ({title, items}) => {
  const sliderRef = useRef(null);

  let settings = {
    dots: false,
    infinite: false,
    lazyLoad: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 1,
    // arrows: false,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <CourseSlider title={title}>
      <Slider ref={sliderRef} className='slideRoot' {...settings}>
        {items.map((data, index) => (
          <Box key={index} sx={{px: {xs: 1, md: 2, lg: 4}, height: '100%'}}>
            <CarouselItem item={data} />
          </Box>
        ))}
      </Slider>
    </CourseSlider>
  );
};

export default CustomCarousel;

CustomCarousel.propTypes = {
  items: PropTypes.array,
  title: PropTypes.string || PropTypes.object,
};
