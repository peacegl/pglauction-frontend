import React from 'react';
import PropTypes from 'prop-types';
import {alpha, Box} from '@mui/material';

const Slider = ({children}) => {
  return (
    <Box
      sx={{
        '& .slideRoot': {
          paddingBottom: 0,
          '& .slick-slide': {
            px: 1.5,
          },
          '& .slick-prev, .slick-next': {
            zIndex: 1,
            '&:before': {
              fontSize: {xs: '18px', sm: '20px'},
              color: alpha('#000', 0.8),
              '&:hover': {
                color: '#000',
              },
            },
          },
          '& .slick-prev': {
            position: 'absolute',
            top: '50%',
            left: '0%',
            transform: ' translate(-50%, -50%)',
          },
          '& .slick-next': {
            position: 'absolute',
            top: '50%',
            left: '100% !important',
            transform: ' translate(-50%, -50%)',
          },
        },
      }}
    >
      {children}
    </Box>
  );
};

export default Slider;

Slider.propTypes = {
  children: PropTypes.node.isRequired,
};
