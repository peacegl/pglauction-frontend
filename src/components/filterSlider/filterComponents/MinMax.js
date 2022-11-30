import IntlMessages from '@crema/utility/IntlMessages';
import {Box, MenuItem, TextField} from '@mui/material';
import PropTypes from 'prop-types';

const MinMax = ({value, setValue, select = false, items}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <TextField
        select={select}
        label={<IntlMessages id='common.min' />}
        value={value[0]}
        onChange={(e) => {
          console.log('sdfsd', e.target.value);
          setValue([e.target.value, value[1]]);
        }}
        size='small'
        sx={{flex: 1}}
      >
        {select && <Box sx={{height: '200px'}}>{items}</Box>}
      </TextField>
      <Box sx={{mx: 3}}>-</Box>
      <TextField
        select={select}
        label={<IntlMessages id='common.max' />}
        value={value[1]}
        onChange={(e) => setValue([value[0], e.target.value])}
        size='small'
        sx={{flex: 1}}
      >
        {select && <Box sx={{height: '200px'}}>{items}</Box>}
      </TextField>
    </Box>
  );
};

export default MinMax;
MinMax.propTypes = {
  value: PropTypes.array,
  setValue: PropTypes.func,
  select: PropTypes.bool,
  items: PropTypes.array,
};
