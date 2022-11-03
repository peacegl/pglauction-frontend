import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import PropTypes from 'prop-types';
import {useField} from 'formik';

const AppDateField = (props) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : '';
  return (
    <DatePicker
      onChange={(value) =>
        props.setfieldvalue ? props.setfieldvalue(props.name, value) : {}
      }
      value={props.value}
      {...props}
      renderInput={(params) => {
        return (
          <TextField
            {...params}
            {...props}
            {...field}
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
  value: PropTypes.string,
  setfieldvalue: PropTypes.func,
};
