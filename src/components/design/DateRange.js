import React, {useState} from 'react';
import {DateRangePicker} from 'mui-daterange-picker';
import {
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@mui/material';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

const DateRange = (props) => {
  const [open, setOpen] = useState(false);
  const [dateRange, setDateRange] = useState({});
  const toggle = () => setOpen(!open);
  const dateformated = dateRange.startDate
    ? `${dateRange.startDate?.getFullYear()}-${
        dateRange.startDate?.getMonth() + 1
      }-${dateRange.startDate?.getDate()} -- ${dateRange.endDate?.getFullYear()}-${
        dateRange.endDate?.getMonth() + 1
      }-${dateRange.endDate?.getDate()}`
    : '-- Select Date --';

  return (
    <>
      <Box display='flex'>
        <FormControl sx={{m: 1, width: '25ch'}} variant='outlined'>
          <InputLabel htmlFor='input-id'>Date Range</InputLabel>
          <OutlinedInput
            id='input-id'
            value={dateformated}
            onFocus={() => setOpen(true)}
            onChange={() => setDateRange({})}
            label='Password'
            endAdornment={
              <InputAdornment position='end'>
                {dateRange.startDate ? (
                  <IconButton onClick={() => setDateRange({})}>
                    <CloseOutlinedIcon fontSize='small' />
                  </IconButton>
                ) : (
                  ''
                )}
              </InputAdornment>
            }
          />
        </FormControl>
      </Box>
      <Box sx={{display: 'flex', position: 'fixed', zIndex: 10}}>
        <DateRangePicker
          open={open}
          toggle={toggle}
          onChange={(range) => setDateRange(range)}
        />
      </Box>
    </>
  );
};

export default DateRange;
