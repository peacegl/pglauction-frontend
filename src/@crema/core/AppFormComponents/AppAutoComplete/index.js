import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import PropTypes from 'prop-types';
import {Chip} from '@mui/material';

export default function AppAutoComplete({
  options = [],
  onType = () => {},
  keyName,
  idField = 'id',
  name,
  placeholder,
  dataLoading,
  handleChange,
  disabled,
  disabledId = [],
  value,
  helperText = '',
  error,
  multiple = false,
  onSearch,
  ...rest
}) {
  const loading = !disabled && dataLoading;
  const onInputChange = (event, value, reason) => {
    const object = {};
    object[keyName] = value;
    if (onSearch) onSearch(object);
  };
  const onSelectValue = (e, value) => {
    const event = {
      target: {
        name,
        value:
          multiple === true
            ? value.map((data) => data?.[idField])
            : value?.[idField],
      },
    };
    if (handleChange) handleChange(event);
  };

  const getValue = () => {
    if (multiple) {
      if (value) {
        return options?.filter((option) => value.includes(option?.[idField]));
      } else {
        return [];
      }
    }
    return options?.find((option) => option?.[idField] === value) || null;
  };

  return (
    <Autocomplete
      disabled={disabled}
      multiple={multiple}
      onChange={onSelectValue}
      onInputChange={onInputChange}
      isOptionEqualToValue={(option, value) => {
        if (multiple) {
          return option?.[idField] === value?.[idField];
        } else {
          return option?.[idField] === value?.[idField];
        }
      }}
      getOptionLabel={(option) => option?.[keyName]}
      options={options}
      loading={loading}
      name={name}
      value={getValue()}
      renderTags={(tagValue, getTagProps) =>
        tagValue.map((option, index) => (
          <Chip
            key={index}
            label={option[keyName]}
            {...getTagProps({index})}
            disabled={disabledId.indexOf(option?.[idField]) !== -1}
          />
        ))
      }
      {...rest}
      renderInput={(params) => (
        <TextField
          name={name}
          placeholder={placeholder}
          {...params}
          {...rest}
          variant='outlined'
          onChange={(ev) => onType(ev.target.value)}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color='inherit' size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
          helperText={helperText}
          error={error}
        />
      )}
    />
  );
}

AppAutoComplete.propTypes = {
  onType: PropTypes.func,
  options: PropTypes.array,
  onChange: PropTypes.func,
  handleChange: PropTypes.func,
  placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  keyName: PropTypes.string,
  idField: PropTypes.string,
  value: PropTypes.any,
  name: PropTypes.string,
  disabled: PropTypes.bool,
  multiple: PropTypes.bool,
  dataLoading: PropTypes.bool,
  helperText: PropTypes.string,
  error: PropTypes.bool,
  disabledId: PropTypes.bool,
  onSearch: PropTypes.func,
};
