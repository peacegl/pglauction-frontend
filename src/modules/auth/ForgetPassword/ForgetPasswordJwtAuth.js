import React, {useEffect, useState} from 'react';
import {Form, Formik} from 'formik';
import * as yup from 'yup';
import Link from 'next/link';
import AppInfoView from '@crema/core/AppInfoView';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IntlMessages from '@crema/utility/IntlMessages';
import AppTextField from '@crema/core/AppFormComponents/AppTextField';
import {Fonts} from '../../../shared/constants/AppEnums';
import AuthWrapper from '../AuthWrapper';
import jwtAxios from '@crema/services/auth/jwt-auth';
import {showMessage} from 'redux/actions';
import {Alert, LoadingButton} from '@mui/lab';
import {useDispatch} from 'react-redux';
import {appIntl} from '@crema/utility/helper/Utils';
const {messages = []} = appIntl() ? appIntl() : {};

const validationSchema = yup.object({
  email: yup
    .string()
    .email(<IntlMessages id='validation.emailFormat' />)
    .required(<IntlMessages id='validation.emailRequired' />),
});

const ForgetPasswordJwtAuth = () => {
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (errorMessage != '') {
      const timeout = setTimeout(() => {
        setErrorMessage('');
      }, 4000);
      clearInterval(timeout);
    }
  }, [errorMessage]);
  return (
    <AuthWrapper>
      <Box sx={{width: '100%'}}>
        {errorMessage && (
          <Box mb={3}>
            <Alert severity='error'>{errorMessage}</Alert>
          </Box>
        )}
        <Box sx={{mb: {xs: 8, xl: 10}}}>
          <Typography
            variant='h2'
            component='h2'
            sx={{
              mb: 1.5,
              color: (theme) => theme.palette.text.primary,
              fontWeight: Fonts.SEMI_BOLD,
              fontSize: {xs: 14, xl: 16},
            }}
          >
            <IntlMessages id='common.forgetPassword' />
          </Typography>
        </Box>

        <Box sx={{flex: 1, display: 'flex', flexDirection: 'column'}}>
          <Box sx={{flex: 1, display: 'flex', flexDirection: 'column'}}>
            <Formik
              validateOnChange={true}
              initialValues={{
                email: '',
              }}
              validationSchema={validationSchema}
              onSubmit={async (data, {setSubmitting, resetForm}) => {
                setSubmitting(true);
                setErrorMessage('');
                try {
                  //reset password api goes here
                  const resp = await jwtAxios.post('/forget_password', {
                    ...data,
                  });
                  if (
                    (resp.status === 200 || resp.status === 202) &&
                    resp.data.result
                  ) {
                    dispatch(
                      showMessage(messages['message.resetPasswordMailSent']),
                    );
                  } else {
                    setErrorMessage(
                      resp.data?.message ??
                        'Something went wrong, please try again later',
                    );
                  }
                } catch (err) {
                  setErrorMessage(
                    err.response?.data?.message ??
                      'Something went wrong, please try again later',
                  );
                }
                setSubmitting(false);
                resetForm();
              }}
            >
              {({isSubmitting}) => (
                <Form style={{textAlign: 'left'}}>
                  <Box sx={{mb: {xs: 5, lg: 8}}}>
                    <AppTextField
                      placeholder='Email'
                      name='email'
                      label={<IntlMessages id='common.emailAddress' />}
                      sx={{
                        width: '100%',
                        '& .MuiInputBase-input': {
                          fontSize: 14,
                        },
                      }}
                      variant='outlined'
                    />
                  </Box>

                  <LoadingButton
                    loading={isSubmitting}
                    loadingPosition='center'
                    variant='contained'
                    type='submit'
                    sx={{
                      fontWeight: Fonts.REGULAR,
                      textTransform: 'capitalize',
                      fontSize: 16,
                      minWidth: 160,
                    }}
                  >
                    <IntlMessages id='common.sendNewPassword' />
                  </LoadingButton>
                </Form>
              )}
            </Formik>
            <Typography
              sx={{
                pt: 3,
                fontSize: 15,
                color: 'grey.500',
              }}
            >
              <span style={{marginRight: 4}}>
                <IntlMessages id='common.alreadyHavePassword' />
              </span>
              <Box
                component='span'
                sx={{
                  fontWeight: Fonts.MEDIUM,
                  '& a': {
                    color: (theme) => theme.palette.primary.main,
                    textDecoration: 'none',
                  },
                }}
              >
                <Link href='/signin'>
                  <IntlMessages id='common.signIn' />
                </Link>
              </Box>
            </Typography>
          </Box>
        </Box>
      </Box>
      <AppInfoView />
    </AuthWrapper>
  );
};

export default ForgetPasswordJwtAuth;
