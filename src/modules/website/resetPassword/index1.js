import React, {useState} from 'react';
import Card from '@mui/material/Card';
import {Form, Formik} from 'formik';
import * as yup from 'yup';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import {useIntl} from 'react-intl';
import Box from '@mui/material/Box';
import {Fonts} from '../../../shared/constants/AppEnums';
import AppTextField from '../../../@crema/core/AppFormComponents/AppTextField';
import {useAuthMethod} from '@crema/utility/AuthHooks';
import {useRouter} from 'next/router';
import {LoadingButton} from '@mui/lab';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {InputAdornment, IconButton} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';

const validationSchema = yup.object({
  email_or_username: yup
    .string()
    // .email_or_username(<IntlMessages id='validation.email_or_usernameFormat' />)
    .required(<IntlMessages id='validation.email_or_usernameRequired' />),
  password: yup
    .string()
    .required(<IntlMessages id='validation.passwordRequired' />),
});

const Signin = () => {
  const history = useRouter();
  const {signInUser} = useAuthMethod();
  const onGoToForgetPassword = () => {
    history.push('/forget-password');
  };
  const {messages} = useIntl();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((d) => !d);
  };

  return (
    <Box
      sx={{
        p: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Card
        sx={{
          textAlign: 'center',
          padding: {xs: 8, lg: 12, xl: '48px 64px'},
          overflow: 'hidden',
          boxShadow:
            '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        }}
      >
        <Box
          sx={{
            mb: {xs: 3, xl: 4},
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box
            sx={{
              mb: 1.5,
              fontWeight: Fonts.BOLD,
              fontSize: 20,
            }}
          >
            <IntlMessages id='common.resetPassword' />
          </Box>
        </Box>

        <Formik
          validateOnChange={true}
          initialValues={{
            email_or_username: '',
            password: '',
          }}
          validationSchema={validationSchema}
          onSubmit={async (data, {setSubmitting}) => {
            setSubmitting(true);
            await signInUser({
              email_or_username: data.email_or_username,
              password: data.password,
            });
            setSubmitting(false);
          }}
        >
          {({isSubmitting}) => (
            <Form
              sx={{
                textAlign: 'left',
              }}
              noValidate
              autoComplete='off'
            >
              <Box
                sx={{
                  mb: {xs: 3, xl: 4},
                }}
              >
                <AppTextField
                  type={showPassword ? 'text' : 'password'}
                  placeholder={messages['common.password']}
                  label={<IntlMessages id='common.password' />}
                  name='password'
                  variant='outlined'
                  size='small'
                  sx={{
                    width: '100%',
                  }}
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
                  mb: {xs: 3, xl: 4},
                }}
              >
                <AppTextField
                  type={showPassword ? 'text' : 'password'}
                  placeholder={messages['common.confirmationPassword']}
                  label={<IntlMessages id='common.password' />}
                  name='password'
                  variant='outlined'
                  size='small'
                  sx={{
                    width: '100%',
                  }}
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
                variant='contained'
                color='primary'
                type='submit'
                loading={isSubmitting}
                sx={{
                  width: '100%',
                  height: 35,
                }}
              >
                <IntlMessages id='common.save' />
              </LoadingButton>
            </Form>
          )}
        </Formik>
      </Card>
    </Box>
  );
};

export default Signin;
