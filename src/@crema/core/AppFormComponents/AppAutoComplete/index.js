import React from 'react';
import TextField from '@mui/material/TextField';
import {Autocomplete} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import PropTypes from 'prop-types';
import {Chip} from '@mui/material';

export default function AppAutoComplete({
  options = [],
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
    if (reason == 'input') {
      const object = {};
      if (rest.keyName1 && rest.keyName2) {
        object.content = value;
      } else {
        object[keyName] = value;
      }
      if (onSearch) onSearch(object);
    }
  };
  const onSelectValue = (e, value) => {
    const event = {
      name,
      value:
        multiple === true
          ? value
            ? value.map((data) => data?.[idField])
            : []
          : value
          ? value?.[idField]
          : '',
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
      id={name}
      options={options}
      name={name}
      loading={loading}
      getOptionLabel={(option) => {
        if (rest.keyName1 && rest.keyName2) {
          return option?.[rest.keyName1] + ' ' + option?.[rest.keyName2];
        }
        return option?.[keyName];
      }}
      {...rest}
      onChange={onSelectValue}
      onInputChange={onInputChange}
      isOptionEqualToValue={(option, value) => {
        if (multiple) {
          return option?.[idField] === value?.[idField];
        } else {
          return option?.[idField] === value?.[idField];
        }
      }}
      value={getValue()}
      renderTags={(tagValue, getTagProps) =>
        tagValue.map((option, index) => (
          <Chip
            color='primary'
            size='small'
            key={index}
            label={
              rest.keyName1 && rest.keyName2
                ? option[rest.keyName1] + ' ' + option[rest.keyName2]
                : option[keyName]
            }
            {...getTagProps({index})}
            disabled={disabledId.indexOf(option?.[idField]) !== -1}
          />
        ))
      }
      helperText={helperText}
      error={error.toString()}
      renderInput={(params) => (
        <TextField
          placeholder={placeholder}
          {...params}
          variant={rest.variant ? rest.variant : 'outlined'}
          label={rest.label}
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
  options: PropTypes.array,
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
