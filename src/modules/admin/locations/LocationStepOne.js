import AppTextField from '@crema/core/AppFormComponents/AppTextField';
import IntlMessages from '@crema/utility/IntlMessages';
import MenuItem from '@mui/material/MenuItem';
import {Box, FormControl, InputLabel, Stack} from '@mui/material';
import {useIntl} from 'react-intl';
import PropTypes from 'prop-types';

const LocationStepOne = (props) => {
  const {messages} = useIntl();
  return (
    <Box>
      <Stack spacing={{xs: 5, md: 8}}>
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
            multiline
            minRows={5}
            // rows={5}
            placeholder={messages['common.lastnamePlaceholder']}
            label={<IntlMessages id='common.lastname' />}
            name='lastname'
            variant='outlined'
            size='small'
            sx={{flex: 1}}
          />
        </Stack>
      </Stack>
    </Box>
  );
};

export default LocationStepOne;
LocationStepOne.propTypes = {
  values: PropTypes.object,
  setfieldvalue: PropTypes.func,
};
