import CarouselItem from '../design/CarouseItem';
import CourseSlider from './CustomSlider';
import PropTypes from 'prop-types';
import {Box} from '@mui/material';
import Slider from 'react-slick';

const CustomCarousel = ({title, items}) => {
  let settings = {
    dots: false,
    infinite: false,
    lazyLoad: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 3,
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
      <Slider className='slideRoot' {...settings}>
        {items.map((data, index) => (
          <Box key={index} sx={{px: {xs: 1, md: 2, lg: 4}, height: '100%'}}>
            <CarouselItem key={index} item={data} />
          </Box>
        ))}
      </Slider>
    </CourseSlider>
  );
};

export default CustomCarousel;

CustomCarousel.propTypes = {
  items: PropTypes.array,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};
