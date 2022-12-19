import AppTextField from '@crema/core/AppFormComponents/AppTextField';
import {Visibility, VisibilityOff} from '@mui/icons-material';
import InputAdornment from '@mui/material/InputAdornment';
import IntlMessages from '@crema/utility/IntlMessages';
import IconButton from '@mui/material/IconButton';
import {Stack, Typography} from '@mui/material';
import {Fonts} from 'shared/constants/AppEnums';
import {useIntl} from 'react-intl';
import {useState} from 'react';

const ChangePasswordForm = () => {
  const [currentPasswor, setShowCurrentPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordC, setShowPasswordC] = useState(false);
  const {messages} = useIntl();

  const handleClickShowCurrentPassword = () => {
    setShowCurrentPassword((d) => !d);
  };

  const handleClickShowPassword = () => {
    setShowPassword((d) => !d);
  };

  const handleClickShowPasswordC = () => {
    setShowPasswordC((d) => !d);
  };

  return (
    <>
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
            placeholder={messages['common.passwordConfirmationPlaceholder']}
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
    </>
  );
};

export default ChangePasswordForm;
