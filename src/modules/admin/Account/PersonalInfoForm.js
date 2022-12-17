import AppTextField from '@crema/core/AppFormComponents/AppTextField';
import IntlMessages from '@crema/utility/IntlMessages';
import {Box, Stack, Typography} from '@mui/material';
import {Fonts} from 'shared/constants/AppEnums';
import Profile from 'components/Profile';
import PropTypes from 'prop-types';
import {useIntl} from 'react-intl';

const PersonalInfoForm = ({values, setFieldValue, profileUrl}) => {
  const {messages} = useIntl();

  return (
    <>
      <Typography
        component='h3'
        sx={{
          fontSize: 16,
          fontWeight: Fonts.BOLD,
          mb: {xs: 3, lg: 4},
        }}
      >
        <IntlMessages id='common.personalInfo' />
      </Typography>
      <Box>
        <Stack spacing={{xs: 5, md: 8}}>
          <Stack direction='row' spacing={5} sx={{mx: 'auto'}}>
            <Profile
              width={{xs: 70, lg: 100}}
              profileUrl={profileUrl}
              name='profile'
              setfieldvalue={setFieldValue}
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
        </Stack>
      </Box>
    </>
  );
};

export default PersonalInfoForm;
PersonalInfoForm.propTypes = {
  setFieldValue: PropTypes.func,
  values: PropTypes.object,
  profileUrl: PropTypes.any,
};
