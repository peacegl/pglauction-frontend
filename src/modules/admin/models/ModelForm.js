import AppAutocompleteField from '@crema/core/AppFormComponents/AppAutocompleteField';
import AppTextField from '@crema/core/AppFormComponents/AppTextField';
import IntlMessages from '@crema/utility/IntlMessages';
import {Box, Stack} from '@mui/material';
import {useIntl} from 'react-intl';
import PropTypes from 'prop-types';

const ModelForm = (props) => {
  const {messages} = useIntl();
  return (
    <Box>
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
          <AppAutocompleteField
            placeholder={messages['common.makePlaceholder']}
            label={<IntlMessages id='common.make' />}
            name='make_id'
            variant='outlined'
            size='small'
            sx={{flex: 1, width: '100%'}}
            dataLoading={props.makesLoading}
            options={props.makes}
            keyName='name'
            onSearch={props.searchMakes}
            value={props.values?.make_id}
            handleChange={({name, value}) => props.setfieldvalue(name, value)}
          />
        </Stack>
      </Stack>
    </Box>
  );
};

export default ModelForm;
ModelForm.propTypes = {
  values: PropTypes.object,
  setfieldvalue: PropTypes.func,
  makesLoading: PropTypes.bool,
  makes: PropTypes.array,
  searchMakes: PropTypes.func,
};
