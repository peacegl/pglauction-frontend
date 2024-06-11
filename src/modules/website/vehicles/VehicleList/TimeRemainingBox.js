import {useEffect, useState} from 'react';
import {Box} from '@mui/material';
import PropTypes from 'prop-types';

const checkRemaining = (diff) => {
  let total_time_spent = '';
  let total_day = '';
  let total_hour = '';
  let total_minute = '';

  total_day = Math.floor(diff / 86400);
  if (total_day > 0) {
    diff -= total_day * 86400;
    total_time_spent = total_time_spent.concat(' ', total_day, ' Days ');
  }
  total_hour = Math.floor(diff / 3600);
  if (total_hour > 0) {
    diff -= total_hour * 3600;
  }
  total_time_spent = total_time_spent.concat(
    ' ',
    total_hour.toString().padStart(2, '0'),
    ':',
  );

  total_minute = Math.floor(diff / 60);
  if (total_minute > 0) {
    diff -= total_minute * 60;
    total_time_spent = total_time_spent.concat(
      '',
      total_minute.toString().padStart(2, '0'),
      ':',
    );
  }
  if (diff > 0) {
    total_time_spent = total_time_spent.concat(
      '',
      Math.round(diff).toString().padStart(2, '0'),
      '',
    );
  }
  return total_time_spent;
};

const TimeRemainingBox = ({end_date, onExpire}) => {
  const [timeRemaining, setTimeRemaining] = useState('');
  const timeDiff = (end) => {
    const date1 = new Date();
    const date2 = new Date(end);
    const diff = Math.floor(Math.abs((date2 - date1) / 1000));
    setTimeRemaining(checkRemaining(diff));
  };
  useEffect(() => {
    const interval = setInterval(() => {
      timeDiff(end_date);
    }, 1000);
    return () => clearInterval(interval);
  }, [end_date]);

  return (
    <Box
      sx={{
        mt: 3,
        fontWeight: 'bold',
        color: (theme) => theme.palette.success.main,
      }}
    >
      {timeRemaining}
    </Box>
  );
};

export default TimeRemainingBox;
TimeRemainingBox.propTypes = {
  end_date: PropTypes.string.isRequired,
  onExpire: PropTypes.func,
};
