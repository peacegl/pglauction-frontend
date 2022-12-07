import AppDateField from '@crema/core/AppFormComponents/AppDateField';
import AppTextField from '@crema/core/AppFormComponents/AppTextField';
import IntlMessages from '@crema/utility/IntlMessages';
import MenuItem from '@mui/material/MenuItem';
import Profile from 'components/Profile';
import {Box, Stack} from '@mui/material';
import {useIntl} from 'react-intl';
import PropTypes from 'prop-types';

const UserStepOne = (props) => {
  const {messages} = useIntl();

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
            placeholder={messages['common.firstnamePlaceholder']}
            label={<IntlMessages id='common.firstname' />}
            name='firstname'
            variant='outlined'
            size='small'
            sx={{flex: 1}}
          />
          <AppTextField
            placeholder={messages['common.lastnamePlaceholder']}
            label={<IntlMessages id='common.lastname' />}
            name='lastname'
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
        <Stack direction={{xs: 'column', md: 'row'}} spacing={5}>
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
          <AppDateField
            label={<IntlMessages id='common.birthDate' />}
            value={props.values?.birth_date}
            setfieldvalue={(name, value) =>
              props.setfieldvalue(
                name,
                value.getFullYear() +
                  '/' +
                  value.getMonth() +
                  '/' +
                  value.getDate(),
              )
            }
            name='birth_date'
            size='small'
            sx={{flex: 1}}
          />
        </Stack>
      </Stack>
    </Box>
  );
};

export default UserStepOne;
UserStepOne.propTypes = {
  values: PropTypes.object,
  setfieldvalue: PropTypes.func,
  profileUrl: PropTypes.string,
};
