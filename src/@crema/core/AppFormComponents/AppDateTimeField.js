import React from 'react';
import {Field} from 'formik';
import {DateTimePicker} from '@mui/x-date-pickers/DateTimePicker';
import TextField from '@mui/material/TextField';
import PropTypes from 'prop-types';

const AppDateTimeField = (props) => {
  return (
    <Field
      component={DateTimePicker}
      variant='outlined'
      inputVariant='outlined'
      {...props}
      renderInput={(params) => (
        <TextField className={props.className} {...params} {...props} />
      )}
    />
  );
};

export default AppDateTimeField;

AppDateTimeField.propTypes = {
  className: PropTypes.string,
};
