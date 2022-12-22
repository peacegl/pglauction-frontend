import AppTextField from '@crema/core/AppFormComponents/AppTextField';
import {Visibility, VisibilityOff} from '@mui/icons-material';
import {Box, Button, Stack, Typography} from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import MyAccountConfigs from 'configs/pages/my-account';
import IntlMessages from '@crema/utility/IntlMessages';
import IconButton from '@mui/material/IconButton';
import SaveIcon from '@mui/icons-material/Save';
import {Fonts} from 'shared/constants/AppEnums';
import {LoadingButton} from '@mui/lab';
import {Form, Formik} from 'formik';
import {useIntl} from 'react-intl';
import PropTypes from 'prop-types';
import {useState} from 'react';
import {onUpdateAuthUser} from 'redux/actions';
import {useDispatch} from 'react-redux';

const ChangePasswordForm = ({initialValues}) => {
  const [currentPasswor, setShowCurrentPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordC, setShowPasswordC] = useState(false);
  const {messages} = useIntl();
  const dispatch = useDispatch();

  const handleClickShowCurrentPassword = () => {
    setShowCurrentPassword((d) => !d);
  };

  const handleClickShowPassword = () => {
    setShowPassword((d) => !d);
  };

  const handleClickShowPasswordC = () => {
    setShowPasswordC((d) => !d);
  };
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const handleSubmit = async (values) => {
    await dispatch(onUpdateAuthUser(`/change_password`, values, true));
  };

  return (
    <Formik
      validateOnBlur={false}
      initialValues={initialValues}
      enableReinitialize
      validationSchema={
        MyAccountConfigs(
          messages['validation.invalidPhone'],
          messages['validation.invalidWhatsapp'],
          messages['validation.passwordMisMatch'],
        ).validationSchema[1]
      }
      onSubmit={async (values, actions) => {
        actions.setSubmitting(true);
        await delay(0);
        await handleSubmit(values, actions);
        actions.setSubmitting(false);
        actions.resetForm();
      }}
    >
      {({values, setFieldValue, isSubmitting, setFieldError, ...rest}) => {
        return (
          <Form>
            <Typography
              component='h3'
              sx={{
                fontSize: 16,
                fontWeight: Fonts.BOLD,
                mb: {xs: 3, lg: 5},
              }}
            >
              <IntlMessages id='common.changePassword' />
            </Typography>
            <Stack spacing={{xs: 5, md: 8}}>
              <Stack direction={{xs: 'column', md: 'row'}} spacing={5}>
                <AppTextField
                  placeholder={messages['common.currentPasswordPlaceholder']}
                  label={<IntlMessages id='common.currentPassword' />}
                  name='current_password'
                  variant='outlined'
                  size='small'
                  sx={{width: {xs: '100%', md: '48%'}}}
                  type={currentPasswor ? 'text' : 'password'}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton
                          aria-label='toggle password visibility'
                          onClick={handleClickShowCurrentPassword}
                          edge='end'
                        >
                          {currentPasswor ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Stack>
              <Stack direction={{xs: 'column', md: 'row'}} spacing={5}>
                <AppTextField
                  placeholder={messages['common.newPasswordPlaceholder']}
                  label={<IntlMessages id='common.newPassword' />}
                  name='new_password'
                  variant='outlined'
                  size='small'
                  sx={{flex: 1}}
                  type={showPassword ? 'text' : 'password'}
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
                <AppTextField
                  placeholder={
                    messages['common.passwordConfirmationPlaceholder']
                  }
                  label={<IntlMessages id='common.passwordConfirmation' />}
                  name='password_confirmation'
                  variant='outlined'
                  size='small'
                  sx={{flex: 1}}
                  type={showPasswordC ? 'text' : 'password'}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton
                          aria-label='toggle password visibility'
                          onClick={handleClickShowPasswordC}
                          edge='end'
                        >
                          {showPasswordC ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Stack>
            </Stack>
            <Box
              sx={{
                mt: 3,
                display: 'flex',
                flexWrap: 'wrap',
              }}
            >
              <LoadingButton
                loading={isSubmitting}
                loadingPosition='start'
                startIcon={<SaveIcon />}
                variant='contained'
                type='submit'
                sx={{
                  minWidth: 100,
                  mr: 2,
                  mt: 2,
                }}
              >
                <IntlMessages id='common.saveChanges' />
              </LoadingButton>
              <Button
                sx={{
                  minWidth: 100,
                  mt: 2,
                }}
                color='primary'
                variant='outlined'
                type='cancel'
              >
                <IntlMessages id='common.cancel' />
              </Button>
            </Box>
          </Form>
        );
      }}
    </Formik>
  );
};

export default ChangePasswordForm;
ChangePasswordForm.propTypes = {
  initialValues: PropTypes.object,
};
