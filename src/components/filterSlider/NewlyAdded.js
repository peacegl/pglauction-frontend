import IntlMessages from '@crema/utility/IntlMessages';
import {useDispatch} from 'react-redux';
import PropTypes from 'prop-types';
import {useState} from 'react';
import {
  Box,
  FormControl,
  FormControlLabel,
  MenuItem,
  Select,
  Switch,
} from '@mui/material';

const NewlyAdded = ({filterData, reduxReducer}) => {
  const dispatch = useDispatch();
  const [duration, setDuration] = useState(24);
  const onSelect = (e) => {
    dispatch(
      reduxReducer({
        ...filterData,
        newly_added: {
          newly_added_duration: duration,
          newly_added: e.target.checked,
        },
      }),
    );
  };

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
      <FormControl sx={{width: '150px'}}>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
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
        control={
          <Switch
            checked={filterData.newly_added.newly_added}
            onChange={onSelect}
          />
        }
        sx={{mx: 0}}
      />
    </Box>
  );
};

export default NewlyAdded;
NewlyAdded.propTypes = {
  filterData: PropTypes.object,
  reduxReducer: PropTypes.func,
};
