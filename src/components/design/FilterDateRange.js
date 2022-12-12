import {useEffect, useState} from 'react';
import {FormLabel, Stack, TextField} from '@mui/material';
import {DatePicker} from '@mui/x-date-pickers';
import IntlMessages from '@crema/utility/IntlMessages';
import PropTypes from 'prop-types';
export default function FilterDateRange({label, values, changeHandler}) {
  const [dateRange, setDateRange] = useState({});
  useEffect(() => {
    setDateRange(values);
  }, [values]);
  return (
    <>
      <FormLabel>{label}</FormLabel>
      <Stack sx={{direction: 'column', my: 2}} spacing={3}>
        <DatePicker
          value={dateRange.from ?? null}
          onChange={(event) => {
            if (event) {
              setDateRange((state) => {
                const date = {
                  ...state,
                  from:
                    event.getFullYear() +
                    '-' +
                    (event.getMonth() + 1) +
                    '-' +
                    event.getDate(),
                };
                changeHandler(date);
                return date;
              });
            }
          }}
          label={<IntlMessages id='common.from_date' />}
          renderInput={(params) => {
            return (
              <TextField
                variant='outlined'
                size='small'
                sx={{flex: 1}}
                {...params}
                error={false}
              />
            );
          }}
        />
        <DatePicker
          value={dateRange.to ?? null}
          onChange={(event) => {
            if (event) {
              setDateRange((state) => {
                const date = {
                  ...state,
                  to:
                    event.getFullYear() +
                    '-' +
                    (event.getMonth() + 1) +
                    '-' +
                    event.getDate(),
                };
                changeHandler(date);
                return date;
              });
            }
          }}
          label={<IntlMessages id='common.to_date' />}
          renderInput={(params) => {
            return (
              <TextField
                variant='outlined'
                size='small'
                sx={{flex: 1}}
                {...params}
                error={false}
              />
            );
          }}
        />
      </Stack>
    </>
  );
}

FilterDateRange.propTypes = {
  changeHandler: PropTypes.func,
  values: PropTypes.instanceOf(PropTypes.object, PropTypes.array),
  label: PropTypes.instanceOf(PropTypes.string, PropTypes.node),
};
