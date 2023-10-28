import React, { useState } from 'react';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import { Checkbox } from '@mui/material';
import { Form, Formik } from 'formik';
import GoogleIcon from '@mui/icons-material/Google';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import * as yup from 'yup';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import { useIntl } from 'react-intl';
import Box from '@mui/material/Box';
import { grey } from '@mui/material/colors';
import { Fonts } from '../../../shared/constants/AppEnums';
import AppAnimate from '../../../@crema/core/AppAnimate';
import AppTextField from '../../../@crema/core/AppFormComponents/AppTextField';
import { useAuthMethod } from '@crema/utility/AuthHooks';
import { useRouter } from 'next/router';
import { LoadingButton } from '@mui/lab';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { InputAdornment, IconButton } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import AppLogo from '@crema/core/AppLayout/components/AppLogo';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';

const validationSchema = yup.object({
  email_or_username: yup
    .string()
    // .email_or_username(<IntlMessages id='validation.email_or_usernameFormat' />)
    .required(<IntlMessages id='validation.email_or_usernameRequired' />),
  password: yup
    .string()
    .required(<IntlMessages id='validation.passwordRequired' />),
});

const Signin = (props) => {
  const history = useRouter();
  const { signInUser } = useAuthMethod();
  const onGoToForgetPassword = () => {
    history.push('/forget-password');
  };
  const { messages } = useIntl();
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
          overflow: 'hidden',
          boxShadow:
            '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        }}
      >
        {props.showClose && (
          <IconButton
            aria-label='close'
            onClick={props.toggleOpen}
            sx={{ float: 'right', display: 'flex' }}
          >
            <CloseIcon sx={{ fontSize: 18 }} />
          </IconButton>
        )}
        <Box sx={{ padding: 8 }}>
          <Box
            sx={{
              mb: { xs: 3, xl: 4 },
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Box sx={{ mr: 2 }}>
              <AppLogo />
            </Box>
            <Box
              sx={{
                mb: 1.5,
                fontWeight: Fonts.BOLD,
                fontSize: 20,
              }}
            >
              <IntlMessages id='common.login' />
            </Box>
          </Box>
          <Box sx={{ textAlign: 'start', pb: 1 }}>
            <p >Demo Account:</p>
            <p>username: <span style={{ opacity: 0.7 }}>demo</span></p>
            <p>password: <span style={{ opacity: 0.7 }}>password</span></p>
          </Box>

          <Formik
            validateOnChange={true}
            initialValues={{
              email_or_username: '',
              password: '',
            }}
            validationSchema={validationSchema}
            onSubmit={async (data, { setSubmitting }) => {
              setSubmitting(true);
              await signInUser({
                email_or_username: data.email_or_username,
                password: data.password,
              });
              setSubmitting(false);
              if (props.toggleOpen) props.toggleOpen();
            }}
          >
            {({ isSubmitting }) => (
              <Form
                sx={{
                  textAlign: 'left',
                }}
                noValidate
                autoComplete='off'
              >
                <Box
                  sx={{
                    mb: { xs: 3, xl: 4 },
                  }}
                >
                  <AppTextField
                    placeholder={messages['common.email_or_username']}
                    label={<IntlMessages id='common.email_or_username' />}
                    name='email_or_username'
                    variant='outlined'
                    size='small'
                    sx={{
                      width: '100%',
                    }}
                  />
                </Box>

                <Box
                  sx={{
                    mb: { xs: 3, xl: 4 },
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
                    mb: { xs: 3, xl: 4 },
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    alignItems: { sm: 'center' },
                  }}
                >
                  {/* <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                  >
                    <Box
                      sx={{
                        ml: -3,
                      }}
                    >
                      <Checkbox />
                    </Box>
                    <Box component='span' sx={{fontSize: 14}}>
                      <IntlMessages id='common.rememberMe' />
                    </Box>
                  </Box> */}
                  <Box
                    component='span'
                    sx={{
                      // ml: {sm: 'auto'},
                      color: 'primary.main',
                      mt: { xs: 2, sm: 0 },
                      fontWeight: Fonts.BOLD,
                      fontSize: 14,
                      cursor: 'pointer',
                    }}
                    onClick={onGoToForgetPassword}
                  >
                    <IntlMessages id='common.forgetPassword' />
                  </Box>
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
                  <IntlMessages id='common.login' />
                </LoadingButton>
              </Form>
            )}
          </Formik>

          {/* <Box
          sx={{
            mt: {xs: 3, xl: 4},
            mb: {xs: 2, xl: 4},
            display: 'flex',
            flexDirection: {xs: 'column', sm: 'row'},
            justifyContent: {sm: 'center'},
            alignItems: {sm: 'center'},
          }}
        >
          <Box
            component='span'
            sx={{
              mr: 4,
              color: grey[600],
              fontSize: 14,
            }}
          >
            <IntlMessages id='common.orLoginWith' />
          </Box>
          <Box display='inline-block'>
            <IconButton>
              <FacebookIcon
                sx={{
                  color: 'text.secondary',
                }}
              />
            </IconButton>
            <IconButton>
              <GoogleIcon
                sx={{
                  color: 'text.secondary',
                }}
              />
            </IconButton>
            <IconButton>
              <TwitterIcon
                sx={{
                  color: 'text.secondary',
                }}
              />
            </IconButton>
          </Box>
        </Box> */}

          <Box
            sx={{
              mt: { xs: 3, xl: 4 },
              color: grey[700],
              fontSize: 14,
              fontWeight: Fonts.BOLD,
            }}
          >
            <Box
              component='span'
              sx={{
                mr: 2,
              }}
            >
              <IntlMessages id='common.dontHaveAccount' />
            </Box>
            <Box
              component='span'
              color='primary.main'
              onClick={() => {
                history.push('/signup');
              }}
              sx={{
                cursor: 'pointer',
                width: '100%',
                height: 44,
              }}
            >
              <IntlMessages id='common.signup' />
            </Box>
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

export default Signin;
Signin.propTypes = {
  showClose: PropTypes.bool,
  toggleOpen: PropTypes.func,
};
