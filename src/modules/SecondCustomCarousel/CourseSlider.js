import React from 'react';
import PropTypes from 'prop-types';
import {FaChevronLeft, FaChevronRight} from 'react-icons/fa';
import {Box, Paper, IconButton, Typography} from '@mui/material';

const CourseSlider = ({title, children}) => {
  return (
    <Box
      sx={{
        mt: 7,
        // position: 'relative',
        '& .slideRoot': {
          paddingBottom: 0,
          '& .slick-slide': {
            '&  img': {
              // height: 'auto',
            },
          },
          '& .slick-prev, & .slick-next': {
            // top: -25,
            width: '40px',
            hieght: '40px',
            '&:before': {
              fontSize: '40px',
              color: (theme) => theme.palette.primary.main,
            },
          },
          '& .slick-prev': {
            // right: 32,
            // left: 'auto',
          },
          '& .slick-next': {
            // right: 10,
          },
        },
      }}
    >
      {title && (
        <Typography
          color='primary'
          component='h2'
          sx={{
            mx: 3,
            mb: 5,
            fontSize: '30px',
            fontWeight: 'bold',
          }}
        >
          {title}
        </Typography>
      )}
      {/* <Stack direction='row' alignItems='center'>
        <Box>
          <IconButton
            variant='contained'
            onClick={sliderRef?.current?.slickPrev}
            sx={{fontSize: {xs: '20px', md: '30px'}}}
          >
            <FaChevronLeft />
          </IconButton>
        </Box>
        <Box sx={{flex: 1, width: '100%'}}> */}
      {children}
      {/*  </Box>
         <Box>
          <IconButton
            variant='contained'
            onClick={sliderRef?.current?.slickNext}
            sx={{fontSize: {xs: '20px', md: '30px'}}}
          >
            <FaChevronRight />
          </IconButton>
        </Box>
      </Stack> */}
    </Box>
  );
};

export default CourseSlider;

CourseSlider.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string || PropTypes.object,
};
