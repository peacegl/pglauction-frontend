import AppTextField from '@crema/core/AppFormComponents/AppTextField';
import IntlMessages from '@crema/utility/IntlMessages';
import MenuItem from '@mui/material/MenuItem';
import {Box, Stack} from '@mui/material';
import {useIntl} from 'react-intl';
import PropTypes from 'prop-types';

const UserStepTwo = (props) => {
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
          />
          <AppTextField
            placeholder={messages['common.second_emailPlaceholder']}
            label={<IntlMessages id='common.second_email' />}
            name='second_email'
            variant='outlined'
            size='small'
            sx={{flex: 1}}
          />
        </Stack>
        <Stack direction={{xs: 'column', md: 'row'}} spacing={5}>
          <AppTextField
            select
            placeholder={messages['common.statusPlaceholder']}
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
            placeholder={messages['common.typePlaceholder']}
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
            <MenuItem value='pending'>
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
};
