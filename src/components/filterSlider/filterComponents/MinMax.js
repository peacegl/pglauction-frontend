import IntlMessages from '@crema/utility/IntlMessages';
import PropTypes from 'prop-types';
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';

const MinMax = ({value, setValue, select = false, items}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {select ? (
        <>
          <FormControl variant='outlined' size='small' sx={{flex: 1}}>
            <InputLabel>
              <IntlMessages id='common.min' />
            </InputLabel>
            <Select
              label={<IntlMessages id='common.min' />}
              value={value[0]}
              onChange={(e) => setValue([e.target.value, value[1]])}
              MenuProps={{PaperProps: {sx: {maxHeight: 200}}}}
            >
              {select &&
                items.map((year, index) => (
                  <MenuItem value={year} key={index}>
                    {year}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <Box sx={{mx: 3}}>-</Box>
          <FormControl variant='outlined' size='small' sx={{flex: 1}}>
            <InputLabel>
              <IntlMessages id='common.max' />
            </InputLabel>
            <Select
              label={<IntlMessages id='common.max' />}
              value={value[1]}
              onChange={(e) => setValue([value[0], e.target.value])}
              MenuProps={{PaperProps: {sx: {maxHeight: 200}}}}
            >
              {select &&
                items.map((year, index) => (
                  <MenuItem value={year} key={index}>
                    {year}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </>
      ) : (
        <>
          <TextField
            label={<IntlMessages id='common.min' />}
            value={value[0]}
            onChange={(e) => setValue([e.target.value, value[1]])}
            size='small'
            sx={{flex: 1}}
            MenuProps={{PaperProps: {sx: {maxHeight: 100}}}}
          />
          <Box sx={{mx: 3}}>-</Box>
          <TextField
            label={<IntlMessages id='common.max' />}
            value={value[1]}
            onChange={(e) => setValue([value[0], e.target.value])}
            size='small'
            sx={{flex: 1}}
            MenuProps={{PaperProps: {sx: {maxHeight: 100}}}}
          />
        </>
      )}
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
