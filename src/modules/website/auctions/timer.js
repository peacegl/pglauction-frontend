import {useTimer} from 'react-timer-hook';
import PropTypes from 'prop-types';
import {Box} from '@mui/material';
import React from 'react';

const MyTimer = ({expiryTimestamp, onExpire}) => {
  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({
    expiryTimestamp,
    onExpire: () => onExpire(),
  });

  return (
    <Box style={{textAlign: 'center'}}>
      <Box
        sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}
      >
        <Box component='span' sx={{mx: 1}}>
          {days} d
        </Box>
        :
        <Box component='span' sx={{mx: 2}}>
          {hours} h
        </Box>
        :
        <Box component='span' sx={{mx: 2}}>
          {minutes} m
        </Box>
        :
        <Box component='span' sx={{mx: 2}}>
          {seconds} s
        </Box>
      </Box>
    </Box>
  );
};

export default MyTimer;
MyTimer.propTypes = {
  expiryTimestamp: PropTypes.any,
  onExpire: PropTypes.func,
};
