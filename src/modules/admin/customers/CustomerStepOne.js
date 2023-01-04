import AppDateField from '@crema/core/AppFormComponents/AppDateField';
import AppTextField from '@crema/core/AppFormComponents/AppTextField';
import IntlMessages from '@crema/utility/IntlMessages';
import MenuItem from '@mui/material/MenuItem';
import Profile from 'components/Profile';
import {Box, Stack} from '@mui/material';
import {useIntl} from 'react-intl';
import PropTypes from 'prop-types';

const CustomerStepOne = (props) => {
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
            sx={{width: {xs: '100%', md: '49%'}}}
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

export default CustomerStepOne;
CustomerStepOne.propTypes = {
  values: PropTypes.object,
  setfieldvalue: PropTypes.func,
  profileUrl: PropTypes.string,
};
