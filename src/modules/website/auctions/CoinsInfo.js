import React from 'react';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';

const CoinsInfo = ({coins}) => {
  return (
    <Box
      sx={{
        mb: {xl: 1},
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
      }}
    >
      {coins.map((coin) => {
        return (
          <Box
            sx={{
              mt: {xl: 3},
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
              component='h3'
              sx={{
                fontWeight: 'bold',
                fontSize: 20,
                color: 'primary.main',
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

export default CoinsInfo;

CoinsInfo.defaultProps = {
  coins: [],
};

CoinsInfo.propTypes = {
  coins: PropTypes.array,
};
