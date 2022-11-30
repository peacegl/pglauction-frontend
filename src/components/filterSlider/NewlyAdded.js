import IntlMessages from '@crema/utility/IntlMessages';
import {
  Box,
  FormControl,
  FormControlLabel,
  MenuItem,
  Select,
  Switch,
} from '@mui/material';
import PropTypes from 'prop-types';

const NewlyAdded = ({filterData}) => {
  return (
    <Box
      sx={{
        mx: 2,
        my: 3,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <FormControl>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={filterData.newly_added.newly_added_duration}
          size='small'
        >
          <MenuItem value={24}>
            <IntlMessages id='common.last_24_hours' />
          </MenuItem>
          <MenuItem value={7}>
            <IntlMessages id='common.last_7_days' />
          </MenuItem>
        </Select>
      </FormControl>
      <FormControlLabel
        control={<Switch checked={filterData.newly_added.newly_added} />}
        sx={{mx: 0}}
      />
    </Box>
  );
};

export default NewlyAdded;
NewlyAdded.propTypes = {
  filterData: PropTypes.object,
};
