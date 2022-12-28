import React from 'react';
import PropTypes from 'prop-types';
import {Paper, Typography} from '@mui/material';

const CustomSlider = ({title, children}) => {
  return (
    <Paper
      sx={{
        p: 4,
        mt: 5,
        position: 'relative',
        '& .slideRoot': {
          paddingBottom: 0,
          '& .slick-slide': {
            '&  img': {
              height: 'auto',
            },
          },
          '& .slick-prev, & .slick-next': {
            top: -20,
            '&:before': {
              color: (theme) => theme.palette.text.primary,
            },
          },
          '& .slick-prev': {
            right: 32,
            left: 'auto',
          },
          '& .slick-next': {
            right: 10,
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
    </Paper>
  );
};

export default CustomSlider;

CustomSlider.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};
