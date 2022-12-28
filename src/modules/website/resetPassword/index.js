import React, {useEffect, useState} from 'react';
import {Form, Formik} from 'formik';
import * as yup from 'yup';
import {Fonts} from 'shared/constants/AppEnums';
import PropTypes from 'prop-types';
import AppTextField from '@crema/core/AppFormComponents/AppTextField';
import IntlMessages from '@crema/utility/IntlMessages';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import AppInfoView from '@crema/core/AppInfoView';
import AuthWrapper from '../../auth/AuthWrapper';
import {useRouter} from 'next/router';
import jwtAxios from '@crema/services/auth/jwt-auth';
import Error404 from 'modules/errorPages/Error404';
import {Alert, IconButton, InputAdornment, Skeleton} from '@mui/material';
import {LoadingButton} from '@mui/lab';
import SaveIcon from '@mui/icons-material/Save';
import {Visibility, VisibilityOff} from '@mui/icons-material';
import {showMessage} from 'redux/actions';
import {useDispatch} from 'react-redux';
import {appIntl} from '@crema/utility/helper/Utils';
const {messages = []} = appIntl() ? appIntl() : {};
const validationSchema = yup.object({
  email: yup.string(),
  password: yup
    .string()
    .min(8, <IntlMessages id='validation.min8Letter' />)
    .required(<IntlMessages id='validation.passwordRequired' />),
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
  const [pageState, setPageState] = useState(1);
  const [resetPass, setResetPass] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleClickShowPassword = () => {
    setShowPassword((d) => !d);
  };

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    if (router.query?.token) {
      setPageState(1);
      try {
        const resp = await jwtAxios.get(
          '/reset-password/' + router.query.token,
        );
        if ((resp.status === 200, resp.data.result)) {
          setPageState(2);
          setResetPass(resp.data.data);
          return;
        }
      } catch (err) {
        console.log(err);
      }
      setPageState(3);
    }
  }

  useEffect(() => {
    if (errorMessage != '') {
      const timeout = setTimeout(() => {
        setErrorMessage('');
      }, 4000);
      clearInterval(timeout);
    }
  }, [errorMessage]);

  return (
    <Box sx={{width: '100%', mt: 7}}>
      {pageState == 1 ? (
        <>
          <Box
            sx={{
              maxWidth: 900,
              minHeight: {xs: 320, sm: 450},
              width: '100%',
              margin: 'auto',
            }}
          >
            <Skeleton
              animation='wave'
              variant='rounded'
              width='100%'
              height='420px'
            />
          </Box>
        </>
      ) : pageState == 2 ? (
        <AuthWrapper>
          {errorMessage && (
            <Box mb={3}>
              <Alert severity='error'>{errorMessage}</Alert>
            </Box>
          )}
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
              email: resetPass.email,
              password: '',
              password_confirmation: '',
            }}
            validationSchema={validationSchema}
            onSubmit={(data, {resetForm, setSubmitting}) => {
              (async function () {
                setSubmitting(true);
                setErrorMessage('');
                try {
                  const resp = await jwtAxios.post('/reset-password', {
                    token: resetPass.token,
                    email: resetPass.email,
                    password: data.password,
                    password_confirmation: data.password_confirmation,
                  });
                  if (
                    (resp.status === 200 || resp.status === 202) &&
                    resp.data.result
                  ) {
                    dispatch(
                      showMessage(messages['message.resetPasswordSuccess']),
                    );
                    router.push('/signin');
                  } else {
                    setErrorMessage(
                      JSON.stringify(resp.data?.message) ??
                        'Something went wrong',
                    );
                  }
                } catch (err) {
                  setErrorMessage(
                    err.response?.data?.message ??
                      'Something went wrong, please try again later',
                  );
                  console.log(err);
                }
                setSubmitting(false);
                resetForm();
              })();
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
                    name='email'
                    type='email'
                    disabled={true}
                    label={<IntlMessages id='common.email' />}
                    sx={{
                      width: '100%',
                    }}
                    value={resetPass.email}
                    variant='outlined'
                  />
                </Box>

                <Box
                  sx={{
                    mb: {xs: 4, lg: 6},
                  }}
                >
                  <AppTextField
                    name='password'
                    type={showPassword ? 'text' : 'password'}
                    label={<IntlMessages id='common.password' />}
                    sx={{
                      width: '100%',
                    }}
                    variant='outlined'
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton
                            aria-label='toggle password visibility'
                            onClick={handleClickShowPassword}
                            edge='end'
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>

                <Box
                  sx={{
                    mb: {xs: 4, lg: 6},
                  }}
                >
                  <AppTextField
                    type={showPassword ? 'text' : 'password'}
                    name='password_confirmation'
                    label={<IntlMessages id='common.passwordConfirmation' />}
                    sx={{
                      width: '100%',
                    }}
                    variant='outlined'
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton
                            aria-label='toggle password visibility'
                            onClick={handleClickShowPassword}
                            edge='end'
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
                <LoadingButton
                  loading={isSubmitting}
                  loadingPosition='start'
                  startIcon={<SaveIcon />}
                  variant='contained'
                  type='submit'
                  sx={{
                    fontWeight: Fonts.REGULAR,
                    textTransform: 'capitalize',
                    fontSize: 16,
                    minWidth: 160,
                  }}
                >
                  <IntlMessages id='common.resetMyPassword' />
                </LoadingButton>
              </Form>
            )}
          </Formik>
          <AppInfoView />
        </AuthWrapper>
      ) : (
        <Error404 url='/' />
      )}
    </Box>
  );
};

export default ResetPassword;

ResetPassword.propTypes = {
  location: PropTypes.object,
};
