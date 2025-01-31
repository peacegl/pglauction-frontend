import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import {Autocomplete} from '@mui/material';
import PropTypes from 'prop-types';
import {Chip} from '@mui/material';
import React from 'react';

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
  helpertext = '',
  error,
  multiple = false,
  onSearch,
  inputValue = undefined,
  returnObject = false,
  ...rest
}) {
  const loading = !disabled && dataLoading;
  const onInputChange = (event, value, reason) => {
    if (reason == 'input') {
      const object = searchObject(value);
      if (onSearch) onSearch(object);
    }
  };
  const searchObject = (value) => {
    const object = {};
    if (rest.keyName1 && rest.keyName2) {
      object.content = value;
    } else {
      if (rest.content) {
        object.content = value;
      } else {
        object[keyName] = value;
      }
    }
    return object;
  };
  const onSelectValue = (e, value) => {
    const event = {
      name,
      value: returnObject
        ? value
        : multiple
        ? value
          ? value.map((data) => data?.[idField])
          : []
        : value
        ? value?.[idField]
        : '',
    };
    if (value == {} || value == '' || value == [] || value == null) {
      const object = searchObject('');
      if (onSearch) onSearch(object);
    }
    if (handleChange) handleChange(event);
  };
  const getValue = () => {
    if (multiple) {
      if (value) {
        return options?.filter((option) => value.includes(option?.[idField]));
      } else {
        return value;
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
          return option?.[rest.keyName1] + ' - ' + option?.[rest.keyName2];
        }
        return `${option?.[keyName]}`;
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
      inputValue={inputValue}
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
          helperText={helpertext}
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
  helpertext: PropTypes.any,
  inputValue: PropTypes.string,
  error: PropTypes.bool,
  disabledId: PropTypes.bool,
  onSearch: PropTypes.func,
  returnObject: PropTypes.bool,
  content: PropTypes.bool,
};
