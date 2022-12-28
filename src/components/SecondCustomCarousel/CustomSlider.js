import React from 'react';
import PropTypes from 'prop-types';
import {Box, Typography} from '@mui/material';

const CustomSlider = ({title, children}) => {
  return (
    <Box
      sx={{
        mt: 7,
        '& .slideRoot': {
          paddingRight: {xs: '25px', sm: '35px'},
          paddingLeft: {xs: '15px', sm: '35px'},
          paddingBottom: 0,
          '& .slick-slide': {
            px: 3,
          },
          '& .slick-prev, .slick-next': {
            zIndex: 1,
            '&:before': {
              fontSize: {xs: '25px', sm: '35px'},
              color: (theme) => theme.palette.primary.main,
            },
          },
          '& .slick-prev': {
            left: {xs: '0px !important', sm: '0px !important'},
          },
          '& .slick-next': {
            right: '15px !important',
          },
        },
      }}
    >
      {title && (
        <Typography
          color='primary'
          component='h2'
          sx={{
            mx: {xs: 7, sm: 11},
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
      {children}
    </Box>
  );
};

export default CustomSlider;

CustomSlider.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};
