import IntlMessages from '@crema/utility/IntlMessages';
import AppLoader from '@crema/core/AppLoader';
import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import PropTypes from 'prop-types';
import {getData} from 'configs';
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Paper,
  TextField,
} from '@mui/material';

const ListItems = ({url, reduxReducer, data, columnName}) => {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState('');
  const [values, setValues] = useState([]);
  const [valuesLoading, setValuesLoading] = useState(false);

  useEffect(() => {
    getData(url, {}, setValuesLoading, setValues);
  }, []);

  const handleSearch = (e) => {
    if (e.keyCode == 13) {
      getData(url, {name: searchValue}, setValuesLoading, setValues);
    }
  };
  const onSelect = (e, id) => {
    e.target.checked
      ? dispatch(
          reduxReducer({
            ...data,
            [columnName]: [...data[columnName], id],
          }),
        )
      : dispatch(
          reduxReducer({
            ...data,
            [columnName]: data[columnName].filter((item) => item != id),
          }),
        );
  };
  return (
    <Box
      sx={{
        mx: 2,
        my: 3,
      }}
    >
      <TextField
        fullWidth
        label={<IntlMessages id='common.search' />}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyDown={handleSearch}
        size='small'
      />
      <Paper
        variant='outlined'
        sx={{height: '200px', overflowY: 'auto', my: 2, px: 3}}
      >
        <FormGroup>
          {values.map((item) => (
            <FormControlLabel
              checked={data[columnName].includes(item.id)}
              control={<Checkbox onChange={(e) => onSelect(e, item.id)} />}
              label={item.name}
              key={item.id}
            />
          ))}

          {valuesLoading && <AppLoader />}
        </FormGroup>
      </Paper>
    </Box>
  );
};

export default ListItems;
ListItems.propTypes = {
  url: PropTypes.any,
  reduxReducer: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
  columnName: PropTypes.string.isRequired,
};
