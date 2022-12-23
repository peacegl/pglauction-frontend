import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import PropTypes from 'prop-types';
import {useField} from 'formik';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';

const AppDateField = (props) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : '';
  return (
    <DatePicker
      onChange={(value) => {
        if (props.setfieldvalue) props.setfieldvalue(props.name, value);
      }}
      value={props.value}
      {...props}
      renderInput={(params) => {
        return (
          <TextField
            {...params}
            {...props}
            helperText={errorText}
            error={!!errorText}
          />
        );
      }}
    />
  );
};

export default AppDateField;

AppDateField.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.any,
  setfieldvalue: PropTypes.any,
};
