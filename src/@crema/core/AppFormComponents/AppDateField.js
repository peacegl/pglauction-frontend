import React from 'react';
import {Field} from 'formik';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import PropTypes from 'prop-types';

const AppDateField = (props) => {
  return (
    <Field
      component={DatePicker}
      variant='outlined'
      inputVariant='outlined'
      format='YYYY-MM-DD'
      mask='____-__-__'
      {...props}
      renderInput={(params) => (
        <TextField className={props.className} {...params} {...props} />
      )}
    />
  );
};

export default AppDateField;

AppDateField.propTypes = {
  className: PropTypes.string,
  format: PropTypes.string,
};
