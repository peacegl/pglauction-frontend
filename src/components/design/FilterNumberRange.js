import {useEffect, useState} from 'react';
import {Box, FormLabel, Stack, TextField} from '@mui/material';
import IntlMessages from '@crema/utility/IntlMessages';
import PropTypes from 'prop-types';

export default function FilterNumberRange({changeHandler, values, item}) {
  const [numberRange, setNumberRange] = useState({});
  useEffect(() => {
    setNumberRange(values);
  }, [values]);
  return (
    <>
      <FormLabel>{item.label}</FormLabel>
      <Box sx={{display: 'flex', columnGap: 3, my: 2}} spacing={3}>
        <TextField
          size='small'
          type='number'
          label={item.min ? item.min : <IntlMessages id='common.min' />}
          variant='outlined'
          value={numberRange.min ?? ''}
          onChange={(event) => {
            setNumberRange((state) => {
              const number = {
                ...state,
                min: event.target.value,
              };
              changeHandler(number);
              return number;
            });
          }}
        />
        <TextField
          size='small'
          type='number'
          label={item.max ? item.max : <IntlMessages id='common.max' />}
          variant='outlined'
          value={numberRange.max ?? ''}
          onChange={(event) => {
            setNumberRange((state) => {
              const number = {
                ...state,
                max: event.target.value,
              };
              changeHandler(number);
              return number;
            });
          }}
        />
      </Box>
    </>
  );
}

FilterNumberRange.propTypes = {
  changeHandler: PropTypes.func,
  values: PropTypes.object,
  item: PropTypes.instanceOf(PropTypes.object, PropTypes.array),
};
