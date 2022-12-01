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

const ListItems = ({
  url,
  reduxReducer,
  data,
  columnName,
  items,
  hideSearch = false,
  customColumn = null,
}) => {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState('');
  const [values, setValues] = useState([]);
  const [valuesLoading, setValuesLoading] = useState(false);

  useEffect(() => {
    if (url) {
      getData(url, {}, setValuesLoading, setValues);
    } else if (items) {
      setValues(items);
    }
  }, []);

  const handleSearch = (e) => {
    if (e.keyCode == 13) {
      getData(
        url,
        customColumn ? {[customColumn]: searchValue} : {name: searchValue},
        setValuesLoading,
        setValues,
      );
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
      {!hideSearch && (
        <TextField
          fullWidth
          label={<IntlMessages id='common.search' />}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={handleSearch}
          size='small'
        />
      )}
      <Paper
        variant='outlined'
        sx={{
          minHeight: '50px',
          maxHeight: '200px',
          overflowY: 'auto',
          my: 2,
          px: 3,
        }}
      >
        <FormGroup>
          {values.map((item, index) => (
            <FormControlLabel
              checked={data[columnName].includes(
                customColumn ? item[customColumn] : item.id,
              )}
              control={
                <Checkbox
                  onChange={(e) =>
                    onSelect(e, customColumn ? item[customColumn] : item.id)
                  }
                />
              }
              label={customColumn ? item[customColumn] : item.name}
              key={index}
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
  items: PropTypes.array,
  hideSearch: PropTypes.bool,
  customColumn: PropTypes.string,
};
