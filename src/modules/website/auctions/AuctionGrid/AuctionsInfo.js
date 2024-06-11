import React from 'react';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import {Typography} from '@mui/material';

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
              flex: 1,
              mt: 3,
              px: 2,
            }}
            key={coin.id}
          >
            <Typography
              component='p'
              sx={{
                fontSize: 14,
                color: 'text.secondary',
              }}
              noWrap={true}
            >
              {coin.name}
            </Typography>
            <Typography
              component='h5'
              sx={{
                fontWeight: 'bold',
                fontSize: 12,
              }}
              noWrap={true}
            >
              {coin.value}
            </Typography>
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
