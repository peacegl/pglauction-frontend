import AppTextField from '@crema/core/AppFormComponents/AppTextField';
import IntlMessages from '@crema/utility/IntlMessages';
import {Box, Stack} from '@mui/material';
import {useIntl} from 'react-intl';
import PropTypes from 'prop-types';

const MakeForm = (props) => {
  const {messages} = useIntl();
  return (
    <Box>
      <AppTextField
        placeholder={messages['common.namePlaceholder']}
        label={<IntlMessages id='common.name' />}
        name='name'
        variant='outlined'
        size='small'
        sx={{width: '100%'}}
      />
    </Box>
  );
};

export default MakeForm;
MakeForm.propTypes = {
  values: PropTypes.object,
  setfieldvalue: PropTypes.func,
};
