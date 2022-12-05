import React from 'react';
import PropTypes from 'prop-types';
import {FaChevronLeft, FaChevronRight} from 'react-icons/fa';
import {Box, Paper, IconButton, Typography} from '@mui/material';

const CourseSlider = ({title, children}) => {
  return (
    <Box
      sx={{
        mt: 7,
        '& .slideRoot': {
          paddingRight: '35px',
          paddingLeft: '47px',
          paddingBottom: 0,
          '& .slick-slide': {
            px: 3,
          },
          '& .slick-prev, .slick-next': {
            zIndex: 1,
            '&:before': {
              fontSize: '35px',
              color: (theme) => theme.palette.primary.main,
            },
          },
          '& .slick-prev': {
            left: '25px !important',
          },
          '& .slick-next': {
            right: '25px !important',
          },
        },
      }}
    >
      {title && (
        <Typography
          color='primary'
          component='h2'
          sx={{
            mx: 14,
            mb: 5,
            fontSize: {
              xs: '22px',
              md: '25px',
              lg: '27px',
              xl: '30px',
            },
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
