import React from 'react';
import AppCard from '@crema/core/AppCard';
import Box from '@mui/material/Box';

import PropTypes from 'prop-types';

import {BiBasket} from 'react-icons/bi';
import {FcGraduationCap} from 'react-icons/fc';
import {GiBookshelf} from 'react-icons/gi';
import {FcReading} from 'react-icons/fc';
import {alpha, Avatar, Typography} from '@mui/material';
import {numberFormater} from 'configs';

const getIcon = (iconType) => {
  switch (iconType) {
    case 'BiBasket':
      return <BiBasket color='#9E49E6' className='icon' />;
    case 'FcGraduationCap':
      return <FcGraduationCap color='#0A8FDC' className='icon' />;
    case 'GiBookshelf':
      return <GiBookshelf color='#49BD65' className='icon' />;
    default:
      return <FcReading color='#9E49E6' className='icon' />;
  }
};

const CardState = ({item, onClick = () => {}}) => {
  return (
    <AppCard
      onClick={onClick}
      sxStyle={{
        height: 1,
        '&:hover': {
          cursor: 'pointer',
          backgroundColor: (theme) => theme.palette.background.default,
        },
      }}
      // className='card-hover'
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            mr: 4,
          }}
        >
          <Avatar
            sx={{
              width: {xs: 40, lg: 50, xl: 60},
              height: {xs: 40, lg: 50, xl: 60},
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: item.color
                ? alpha(item?.color, 0.1)
                : 'transparent',
              padding: 2.5,
            }}
          >
            <Typography
              sx={{color: item.color, fontWeight: 'bold'}}
              className='icon'
            >
              {item.icon}
            </Typography>
          </Avatar>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: {
              xs: 'calc(100% - 62px)',
              lg: 'calc(100% - 70px)',
              xl: 'calc(100% - 76px)',
            },
          }}
        >
          <Box sx={{overflow: 'hidden'}}>
            <Box component='h3'>{numberFormater(item.count)}</Box>
            <Box
              component='p'
              sx={{
                color: 'text.secondary',
                fontSize: 14,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {item.title ?? '0'}
            </Box>
          </Box>
        </Box>
      </Box>
    </AppCard>
  );
};

export default CardState;

CardState.propTypes = {
  item: PropTypes.object,
  onClick: PropTypes.func,
};
