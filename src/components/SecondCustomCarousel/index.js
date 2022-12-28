import CarouselItem from '../design/CarouseItem';
import CourseSlider from './CustomSlider';
import PropTypes from 'prop-types';
import Slider from 'react-slick';

const CustomCarousel = ({title, items}) => {
  const settings = {
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
      <Slider className='slideRoot' {...settings}>
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
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};
