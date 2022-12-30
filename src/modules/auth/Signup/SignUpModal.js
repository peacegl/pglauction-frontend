import AppAutocompleteField from '@crema/core/AppFormComponents/AppAutocompleteField';
import {Box, IconButton, InputAdornment, MenuItem, Stack} from '@mui/material';
import AppTextField from '@crema/core/AppFormComponents/AppTextField';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import IntlMessages from '@crema/utility/IntlMessages';
import {useEffect, useState} from 'react';
import Profile from 'components/Profile';
import {useIntl} from 'react-intl';
import PropTypes from 'prop-types';
import {getData} from 'configs';

const SignUpModal = (props) => {
  const {messages} = useIntl();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordC, setShowPasswordC] = useState(false);
  const [timezones, setTimezones] = useState([]);
  const [timezonesLoading, setTimezonesLoading] = useState(false);

  useEffect(() => {
    getData(`/timezones/auto_complete`, {}, setTimezonesLoading, setTimezones);
  }, []);

  const searchTimezones = (content) => {
    getData(
      `/timezones/auto_complete`,
      content,
      setTimezonesLoading,
      setTimezones,
    );
  };

  const handleClickShowPassword = () => {
    setShowPassword((d) => !d);
  };

  const handleClickShowPasswordC = () => {
    setShowPasswordC((d) => !d);
  };

  return (
    <Box>
      <Stack spacing={{xs: 5, md: 8}}>
        <Stack direction='row' spacing={5} sx={{mx: 'auto'}}>
          <Profile
            width={{xs: 70, lg: 100}}
            profileUrl={props.profileUrl}
            name='profile'
            setfieldvalue={props.setfieldvalue}
          />
        </Stack>
        <Stack direction={{xs: 'column', md: 'row'}} spacing={5}>
          <AppTextField
            placeholder={messages['common.fullnamePlaceholder']}
            label={<IntlMessages id='common.fullname' />}
            name='fullname'
            variant='outlined'
            size='small'
            sx={{flex: 1}}
          />
        </Stack>
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
          <AppTextField
            placeholder={messages['common.phonePlaceholder']}
            label={<IntlMessages id='common.phone' />}
            name='phone'
            variant='outlined'
            size='small'
            sx={{flex: 1}}
          />
          <AppTextField
            placeholder={messages['common.whatsappPlaceholder']}
            label={<IntlMessages id='common.whatsapp' />}
            name='whatsapp'
            variant='outlined'
            size='small'
            sx={{flex: 1}}
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
            dataLoading={timezonesLoading}
            options={timezones}
            keyName='name'
            idField='name'
            onSearch={searchTimezones}
            value={props.values?.timezone}
            handleChange={({name, value}) => props.setfieldvalue(name, value)}
          />
          <AppTextField
            select
            placeholder={messages['common.genderPlaceholder']}
            label={<IntlMessages id='common.gender' />}
            name='gender'
            variant='outlined'
            size='small'
            value={props.values?.gender}
            sx={{flex: 1}}
          >
            <MenuItem value='male' selected>
              <IntlMessages id='common.male' />
            </MenuItem>
            <MenuItem value='female'>
              <IntlMessages id='common.female' />
            </MenuItem>
          </AppTextField>
        </Stack>
      </Stack>
    </Box>
  );
};

export default SignUpModal;
SignUpModal.propTypes = {
  values: PropTypes.object,
  setfieldvalue: PropTypes.func,
  profileUrl: PropTypes.string,
};
