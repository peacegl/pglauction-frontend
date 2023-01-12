import AppAutocompleteField from '@crema/core/AppFormComponents/AppAutocompleteField';
import {Stack, IconButton, InputAdornment, Box, Checkbox} from '@mui/material';
import AppTextField from '@crema/core/AppFormComponents/AppTextField';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import IntlMessages from '@crema/utility/IntlMessages';
import React, {useState} from 'react';
import {useIntl} from 'react-intl';
import PropTypes from 'prop-types';
import Link from 'next/link';

const SignupStepTwo = (props) => {
  const {messages} = useIntl();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordC, setShowPasswordC] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((d) => !d);
  };

  const handleClickShowPasswordC = () => {
    setShowPasswordC((d) => !d);
  };

  return (
    <Stack spacing={{xs: 5, md: 8}}>
      <Stack direction={{xs: 'column', md: 'row'}} spacing={5}>
        <AppTextField
          placeholder={messages['common.emailPlaceholder']}
          label={<IntlMessages id='common.email' />}
          name='email'
          variant='outlined'
          size='small'
          sx={{flex: 1}}
        />
        <AppTextField
          placeholder={messages['common.usernamePlaceholder']}
          label={<IntlMessages id='common.username' />}
          name='username'
          variant='outlined'
          size='small'
          sx={{flex: 1}}
        />
      </Stack>
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
      <Stack direction={{xs: 'column', md: 'row'}} spacing={5}>
        <AppAutocompleteField
          placeholder={messages['common.timezonePlaceholder']}
          label={<IntlMessages id='common.timezone' />}
          name='timezone'
          variant='outlined'
          size='small'
          sx={{flex: 1}}
          dataLoading={props.timezonesLoading}
          options={props.timezones}
          keyName='name'
          idField='name'
          onSearch={props.searchTimezones}
          value={props.values?.timezone}
          handleChange={({name, value}) => props.setfieldvalue(name, value)}
        />
        <Box sx={{flex: 1}}></Box>
      </Stack>
      <Stack>
        <Box>
          <Box
            sx={{
              mt: 2,
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Checkbox
                sx={{
                  ml: -3,
                }}
                name='accept_terms'
                value={props.values.accept_terms}
                checked={props.values.accept_terms}
                onChange={() => {
                  props.setShowTermsError(props.values.accept_terms);
                  props.setfieldvalue(
                    'accept_terms',
                    props.values.accept_terms ? 0 : 1,
                  );
                }}
              />
              <Box
                component='span'
                sx={{
                  mr: 2,
                  color: 'grey.500',
                }}
              >
                <IntlMessages id='common.iAgreeTo' />
              </Box>
            </Box>
            <Box
              component='span'
              sx={{
                color: (theme) => theme.palette.primary.main,
                cursor: 'pointer',
              }}
            >
              <Link href='/terms' target='_blank'>
                <IntlMessages id='common.termConditions' />
              </Link>
            </Box>
          </Box>
          {props.showTermsError == true && (
            <Box
              component='span'
              sx={{
                color: (theme) => theme.palette.error.main,
                cursor: 'pointer',
              }}
            >
              <IntlMessages id='validation.requiredField' />
            </Box>
          )}
        </Box>
      </Stack>
    </Stack>
  );
};

export default SignupStepTwo;
SignupStepTwo.propTypes = {
  values: PropTypes.object,
  setfieldvalue: PropTypes.func,
  timezones: PropTypes.array,
  timezonesLoading: PropTypes.bool,
  searchTimezones: PropTypes.func,
  showTermsError: PropTypes.bool.isRequired,
  setShowTermsError: PropTypes.func.isRequired,
};
