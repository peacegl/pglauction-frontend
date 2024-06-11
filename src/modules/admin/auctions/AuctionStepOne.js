import AppAutocompleteField from '@crema/core/AppFormComponents/AppAutocompleteField';
import AppDateTimeField from '@crema/core/AppFormComponents/AppDateTimeField';
import AppTextField from '@crema/core/AppFormComponents/AppTextField';
import IntlMessages from '@crema/utility/IntlMessages';
import {Box, MenuItem, Stack} from '@mui/material';
import {useIntl} from 'react-intl';
import PropTypes from 'prop-types';

const AuctionStepOne = (props) => {
  const {messages} = useIntl();
  const today = new Date();
  const tommorrow = new Date();
  return (
    <Box>
      <Stack spacing={{xs: 5, md: 8}}>
        <Stack direction={{xs: 'column', md: 'row'}} spacing={5}>
          <AppAutocompleteField
            placeholder={messages['vehicle.locationPlaceholder']}
            label={<IntlMessages id='vehicle.location' />}
            name='location_id'
            variant='outlined'
            size='small'
            sx={{flex: 1, width: '100%'}}
            dataLoading={props.locationLoading}
            options={props.locations}
            keyName='name'
            onSearch={props.searchLocations}
            value={props.values?.location_id}
            handleChange={({name, value}) => props.setfieldvalue(name, value)}
          />
        </Stack>
        <Stack direction={{xs: 'column', md: 'row'}} spacing={5}>
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
            label={<IntlMessages id='common.status' />}
            name='status'
            variant='outlined'
            size='small'
            value={props.values?.status}
            sx={{flex: 1}}
            disabled={props.values?.status == 'completed'}
          >
            <MenuItem value='active'>
              <IntlMessages id='common.active' />
            </MenuItem>
            {/* <MenuItem value='inactive'>
              <IntlMessages id='common.inactive' />
            </MenuItem> */}
            <MenuItem value='pending'>
              <IntlMessages id='common.pending' />
            </MenuItem>
            <MenuItem value='completed' disabled>
              <IntlMessages id='common.completed' />
            </MenuItem>
          </AppTextField>
        </Stack>
        <Stack direction={{xs: 'column', md: 'row'}} spacing={5}>
          <AppDateTimeField
            placeholder={messages['vehicle.startDatePlaceholder']}
            label={<IntlMessages id='common.startDate' />}
            value={props.values?.start_date}
            setfieldvalue={props.setfieldvalue}
            minDate={today}
            name='start_date'
            size='small'
            sx={{flex: 1}}
          />
          <AppDateTimeField
            placeholder={messages['vehicle.endDatePlaceholder']}
            label={<IntlMessages id='common.endDate' />}
            value={props.values?.end_date}
            setfieldvalue={props.setfieldvalue}
            minDate={tommorrow.setDate(today.getDate() + 1)}
            name='end_date'
            variant='outlined'
            size='small'
            sx={{flex: 1}}
          />
        </Stack>
      </Stack>
    </Box>
  );
};

export default AuctionStepOne;
AuctionStepOne.propTypes = {
  values: PropTypes.object,
  setfieldvalue: PropTypes.func,
  searchLocations: PropTypes.func,
  locationLoading: PropTypes.bool,
  locations: PropTypes.array,
};
