import React from 'react';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';

const AuctionsInfo = ({items}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
      }}
    >
      {items.map((coin) => {
        return (
          <Box
            sx={{
              flex: {xs: '1 0 50%', md: '1 0 25%'},
              mt: 3,
              px: 2,
            }}
            key={coin.id}
          >
            <Box
              component='p'
              sx={{
                fontSize: 14,
                color: 'text.secondary',
              }}
            >
              {coin.name}
            </Box>
            <Box
              component='h5'
              sx={{
                fontWeight: 'bold',
                fontSize: 12,
              }}
            >
              {coin.value}
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default AuctionsInfo;

AuctionsInfo.defaultProps = {
  items: [],
};

AuctionsInfo.propTypes = {
  items: PropTypes.array,
};
