import VehicleGridCard from 'components/vehicles/VehicleGridCard';
import {Grid, IconButton, Box} from '@mui/material';
import CourseSlider from './CourseSlider';
import CarouselItem from '../design/CarouseItem';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import {useRef} from 'react';
import {IndeterminateCheckBox} from '@mui/icons-material';

const CustomCarousel = ({title, items}) => {
  const sliderRef = useRef(null);

  const settings = {
    dots: false,
    infinite: false,
    lazyLoad: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 3,
    // arrows: false,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
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
          <CarouselItem item={data} key={index} />
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
