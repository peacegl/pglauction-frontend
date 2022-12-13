import {useEffect, useState} from 'react';
import {
  Checkbox,
  FormControlLabel,
  FormLabel,
  Paper,
  Stack,
} from '@mui/material';
import PropTypes from 'prop-types';

export default function FilterCheckbox({label, items, changeHandler, values}) {
  const [checkedItems, setCheckedItems] = useState([]);

  const onChange = (event) => {
    if (event.target.checked) {
      setCheckedItems((state) => {
        changeHandler([...state, event.target.name]);
        return [...state, event.target.name];
      });
    } else {
      setCheckedItems((state) => {
        const index = state.indexOf(event.target.name);
        if (index > -1) {
          state.splice(index, 1);
        }
        changeHandler([...state]);
        return [...state];
      });
    }
  };

  useEffect(() => {
    setCheckedItems(values);
  }, [values]);

  return (
    <Stack direction='column' spacing={5}>
      <FormLabel>{label}</FormLabel>
      <Paper
        variant='outlined'
        sx={{
          borderRadius: 1,
          display: 'flex',
          flexWrap: 'wrap',
          mt: '5px !important',
          pl: 4,
        }}
      >
        {items.map((value, index) => (
          <FormControlLabel
            sx={{
              flex: '1 0 48%',
            }}
            key={index + value}
            label={value.charAt(0).toUpperCase() + value.slice(1)}
            control={
              <Checkbox
                size='small'
                name={value}
                value={value}
                checked={checkedItems.includes(value)}
                onChange={(event) => onChange(event)}
              />
            }
          />
        ))}
      </Paper>
    </Stack>
  );
}

FilterCheckbox.propTypes = {
  changeHandler: PropTypes.func,
  values: PropTypes.instanceOf(PropTypes.object, PropTypes.array),
  label: PropTypes.instanceOf(PropTypes.string, PropTypes.node),
  items: PropTypes.instanceOf(PropTypes.string, PropTypes.array),
};
