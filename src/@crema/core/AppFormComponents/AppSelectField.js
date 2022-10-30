import React from 'react';
import {useField} from 'formik';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import FormHelperText from '@mui/material/FormHelperText';
import PropTypes from 'prop-types';

const AppSelectField = (props) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : '';
  return (
    <Box sx={{flex: 1}}>
      <Select {...props} {...field} error={!!errorText} />
      {!props.disabled && (
        <FormHelperText style={{color: '#f44336'}}>{errorText}</FormHelperText>
      )}
    </Box>
  );
};

export default AppSelectField;

AppSelectField.propTypes = {
  disabled: PropTypes.bool,
};
