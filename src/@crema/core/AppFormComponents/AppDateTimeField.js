import {DateTimePicker} from '@mui/x-date-pickers/DateTimePicker';
import TextField from '@mui/material/TextField';
import PropTypes from 'prop-types';
import {useField} from 'formik';

const AppDateTimeField = (props) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : '';
  return (
    <DateTimePicker
      onChange={(value) => setFieldValue(props.name, value, true)}
      // value={values.birthday}
      renderInput={(params) => (
        <TextField
          helperText={errorText}
          error={!!errorText}
          {...props}
          {...params}
        />
      )}
    />
  );
};

export default AppDateTimeField;

AppDateTimeField.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
};
