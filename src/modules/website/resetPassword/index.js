import React, {useEffect, useState} from 'react';
import {Form, Formik} from 'formik';
import * as yup from 'yup';
import {useDispatch} from 'react-redux';
import {fetchError} from 'redux/actions';
import {useIntl} from 'react-intl';
import {Fonts} from 'shared/constants/AppEnums';
import PropTypes from 'prop-types';
import AppTextField from '@crema/core/AppFormComponents/AppTextField';
import IntlMessages from '@crema/utility/IntlMessages';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AppInfoView from '@crema/core/AppInfoView';
import AuthWrapper from '../../auth/AuthWrapper';
import {useRouter} from 'next/router';
import jwtAxios from '@crema/services/auth/jwt-auth';

const validationSchema = yup.object({
  password: yup
    .string()
    .min(8, <IntlMessages id='validation.min8Letter' />)
    .required(<IntlMessages id='validation.enterPassword' />),
  password_confirmation: yup
    .string()
    .min(8, <IntlMessages id='validation.min8Letter' />)
    .required(<IntlMessages id='validation.passwordConfrimationRequired' />)
    .oneOf(
      [yup.ref('password'), null],
      <IntlMessages id='validation.passwordMisMatch' />,
    ),
});

const ResetPassword = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   if (router.query?.token) {
  //     setLoading(true);
  //     jwtAxios.get('/reset-password/' + router.query.token);
  //     console.log(resp.status, resp.data);
  //     setLoading(false);
  //   }
  // }, []);

  return (
    <Box sx={{width: '100%', mt: 7}}>
      {loading ? (
        <div>{router.query.token} Loading ...</div>
      ) : (
        <AuthWrapper>
          <Typography
            variant='h2'
            component='h2'
            sx={{
              mb: 3,
              color: (theme) => theme.palette.text.primary,
              fontWeight: Fonts.SEMI_BOLD,
              fontSize: {xs: 14, xl: 16},
            }}
          >
            <IntlMessages id='common.resetPassword' />
          </Typography>
          <Formik
            validateOnChange={true}
            initialValues={{
              password: '',
              password_confirmation: '',
            }}
            validationSchema={validationSchema}
            onSubmit={async (data, {setSubmitting}) => {
              setSubmitting(true);
              await signInUser({
                password: data.password,
                password_confirmation: data.password_confirmation,
              });
              setSubmitting(false);
            }}
          >
            {({isSubmitting}) => (
              <Form noValidate autoComplete='off'>
                <Box
                  sx={{
                    mb: {xs: 4, lg: 6},
                  }}
                >
                  <AppTextField
                    name='password'
                    label={<IntlMessages id='common.password' />}
                    sx={{
                      width: '100%',
                    }}
                    variant='outlined'
                    type='password'
                  />
                </Box>

                <Box
                  sx={{
                    mb: {xs: 4, lg: 6},
                  }}
                >
                  <AppTextField
                    name='password_confirmation'
                    label={<IntlMessages id='common.retypePassword' />}
                    sx={{
                      width: '100%',
                    }}
                    variant='outlined'
                    type='password'
                  />
                </Box>

                <Button
                  variant='contained'
                  disabled={isSubmitting}
                  color='primary'
                  type='submit'
                  sx={{
                    fontWeight: Fonts.REGULAR,
                    textTransform: 'capitalize',
                    fontSize: 16,
                    minWidth: 160,
                  }}
                >
                  <IntlMessages id='common.resetMyPassword' />
                </Button>
              </Form>
            )}
          </Formik>
          <AppInfoView />
        </AuthWrapper>
      )}
    </Box>
  );
};

export default ResetPassword;

ResetPassword.propTypes = {
  location: PropTypes.object,
};
