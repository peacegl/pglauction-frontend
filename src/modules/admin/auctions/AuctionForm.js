import AppAutocompleteField from '@crema/core/AppFormComponents/AppAutocompleteField';
import AppTextField from '@crema/core/AppFormComponents/AppTextField';
import IntlMessages from '@crema/utility/IntlMessages';
import {Box, Stack} from '@mui/material';
import {useIntl} from 'react-intl';
import PropTypes from 'prop-types';

const AuctionForm = (props) => {
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
          {/* <AppAutocompleteField
            placeholder={messages['common.parentNamePlaceholder']}
            label={<IntlMessages id='common.parentName' />}
            name='parent_id'
            variant='outlined'
            size='small'
            sx={{flex: 1, width: '100%'}}
            dataLoading={props.categoryLoading}
            options={props.parentCategories}
            keyName='name'
            onSearch={props.searchCategories}
            value={props.values?.parent_id}
            handleChange={({name, value}) => props.setfieldvalue(name, value)}
          /> */}
        </Stack>
      </Stack>
    </Box>
  );
};

export default AuctionForm;
AuctionForm.propTypes = {
  values: PropTypes.object,
  setfieldvalue: PropTypes.func,
};
