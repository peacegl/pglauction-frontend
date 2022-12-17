import {useAuthUser} from '@crema/utility/AuthHooks';
import PersonalInfoForm from '../PersonalInfoForm';
import PropTypes from 'prop-types';
import {Box, Button} from '@mui/material';
import {Form, Formik} from 'formik';
import * as yup from 'yup';
import {useRef, useState} from 'react';
import IntlMessages from '@crema/utility/IntlMessages';
import {LoadingButton} from '@mui/lab';

const validationSchema = yup.object({
  email: yup.string().email('Invalid email format').required('Required'),
});
const PersonalInfo = () => {
  return (
    <PersonalInfoForm
      values={values}
      setFieldValue={setFieldValue}
      isSubmitting={isSubmitting}
    />
  );
};

export default PersonalInfo;

PersonalInfo.propTypes = {
  setFieldValue: PropTypes.func,
  values: PropTypes.string,
};
