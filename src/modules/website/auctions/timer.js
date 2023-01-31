import {Box} from '@mui/material';
import React from 'react';
import {useTimer} from 'react-timer-hook';

const MyTimer = ({expiryTimestamp}) => {
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
    onExpire: () => console.warn('onExpire called'),
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
