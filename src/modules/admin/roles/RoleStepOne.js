import AppTextField from '@crema/core/AppFormComponents/AppTextField';
import IntlMessages from '@crema/utility/IntlMessages';
import MenuItem from '@mui/material/MenuItem';
import {Box, Stack} from '@mui/material';
import {useIntl} from 'react-intl';
import PropTypes from 'prop-types';

const RoleStepOne = (props) => {
  const {messages} = useIntl();

  return (
    <Box>
      <Stack spacing={{xs: 5, md: 8}}>
        <Stack spacing={5}>
          <AppTextField
            placeholder={messages['common.namePlaceholder']}
            label={<IntlMessages id='common.name' />}
            name='name'
            variant='outlined'
            size='small'
            sx={{flex: 1}}
          />
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
            <MenuItem value='user role'>User Role</MenuItem>
            <MenuItem value='customer role'>Customer Role</MenuItem>
          </AppTextField>
        </Stack>
      </Stack>
    </Box>
  );
};

export default RoleStepOne;
RoleStepOne.propTypes = {
  values: PropTypes.object,
  setfieldvalue: PropTypes.func,
};
