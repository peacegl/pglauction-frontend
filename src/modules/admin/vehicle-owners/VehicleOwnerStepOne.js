import AppTextField from '@crema/core/AppFormComponents/AppTextField';
import IntlMessages from '@crema/utility/IntlMessages';
import {useIntl} from 'react-intl';
import PropTypes from 'prop-types';
import {
   
  Stack,
} from '@mui/material';

const VehicleOwnerStepOne = (props) => {
  const {messages} = useIntl();

  return (
    <Stack spacing={{xs: 5, md: 8}}>
      <Stack direction={{xs: 'column', md: 'row'}} spacing={5}>
        <AppTextField
          placeholder={messages['common.namePlaceholder']}
          label={<IntlMessages id='common.name' />}
          name='name'
          variant='outlined'
          size='small'
          sx={{flex: 1}}
        />
      </Stack>
    </Stack>
  );
};

export default VehicleOwnerStepOne;
VehicleOwnerStepOne.propTypes = { 
};
