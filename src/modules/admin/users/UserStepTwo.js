import AppTextField from '@crema/core/AppFormComponents/AppTextField';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {InputAdornment, IconButton} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import IntlMessages from '@crema/utility/IntlMessages';
import jwtAxios from '@crema/services/auth/jwt-auth';
import MenuItem from '@mui/material/MenuItem';
import {Box, Stack} from '@mui/material';
import {useIntl} from 'react-intl';
import PropTypes from 'prop-types';
import {useState} from 'react';

const UserStepTwo = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordC, setShowPasswordC] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((d) => !d);
  };

  const handleClickShowPasswordC = () => {
    setShowPasswordC((d) => !d);
  };

  const checkUniqueness = async (url, value, type) => {
    try {
      const params = {};
      type == 'email'
        ? (params.email = value)
        : type == 'username'
        ? (params.username = value)
        : true;

      const res = await jwtAxios.get(url, {
        params: {
          ...params,
          id: props.recordId,
        },
      });
      if (res.status === 200) {
        return res.data.result;
      }
      return false;
    } catch (error) {
      return false;
    }
  };

  const {messages} = useIntl();
  return (
    <Box>
      <Stack spacing={{xs: 5, md: 8}}>
        <Stack direction={{xs: 'column', md: 'row'}} spacing={5}>
          <AppTextField
            placeholder={messages['common.emailPlaceholder']}
            label={<IntlMessages id='common.email' />}
            name='email'
            variant='outlined'
            size='small'
            sx={{flex: 1}}
            inputProps={{
              onBlur: async (e) => {
                const error = await checkUniqueness(
                  '/loginables/valid_credential',
                  e.target.value,
                  'email',
                );
                if (!error) {
                  props.setFieldError(
                    'email',
                    <IntlMessages id='validation.notUniqueEmail' />,
                    false,
                  );
                }
              },
            }}
          />
          <AppTextField
            placeholder={messages['common.usernamePlaceholder']}
            label={<IntlMessages id='common.username' />}
            name='username'
            variant='outlined'
            size='small'
            sx={{flex: 1}}
            inputProps={{
              onBlur: async (e) => {
                const error = await checkUniqueness(
                  '/loginables/valid_credential',
                  e.target.value,
                  'username',
                );
                if (!error) {
                  props.setFieldError(
                    'username',
                    <IntlMessages id='validation.notUniqueUsername' />,
                  );
                }
              },
            }}
          />
        </Stack>
        {!props.edit && (
          <Stack direction={{xs: 'column', md: 'row'}} spacing={5}>
            <AppTextField
              placeholder={messages['common.passwordPlaceholder']}
              label={<IntlMessages id='common.password' />}
              name='password'
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
        )}
        <Stack direction={{xs: 'column', md: 'row'}} spacing={5}>
          <AppTextField
            select
            label={<IntlMessages id='common.status' />}
            name='status'
            variant='outlined'
            size='small'
            value={props.values?.status}
            sx={{flex: 1}}
          >
            <MenuItem value='active'>
              <IntlMessages id='common.active' />
            </MenuItem>
            <MenuItem value='inactive'>
              <IntlMessages id='common.inactive' />
            </MenuItem>
            <MenuItem value='pending'>
              <IntlMessages id='common.pending' />
            </MenuItem>
          </AppTextField>
          <AppTextField
            select
            label={<IntlMessages id='common.type' />}
            name='type'
            variant='outlined'
            size='small'
            value={props.values?.type}
            sx={{flex: 1}}
          >
            <MenuItem value='employee'>
              <IntlMessages id='common.employee' />
            </MenuItem>
            <MenuItem value='seller'>
              <IntlMessages id='common.seller' />
            </MenuItem>
          </AppTextField>
        </Stack>
      </Stack>
    </Box>
  );
};

export default UserStepTwo;
UserStepTwo.propTypes = {
  values: PropTypes.object,
  setfieldvalue: PropTypes.func,
  edit: PropTypes.bool,
  recordId: PropTypes.string,
  setFieldError: PropTypes.func,
};
