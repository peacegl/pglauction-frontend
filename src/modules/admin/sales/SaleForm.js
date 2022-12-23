import AppAutocompleteField from '@crema/core/AppFormComponents/AppAutocompleteField';
import AppTextField from '@crema/core/AppFormComponents/AppTextField';
import AppDateField from '@crema/core/AppFormComponents/AppDateField';
import IntlMessages from '@crema/utility/IntlMessages';
import {Box, MenuItem, Stack} from '@mui/material';
import {useIntl} from 'react-intl';
import PropTypes from 'prop-types';

const SaleForm = (props) => {
  const {messages} = useIntl();

  return (
    <Box sx={{mt: 10}}>
      <Stack spacing={{xs: 5, md: 8}}>
        <Stack direction={{xs: 'column', md: 'row'}} spacing={5}>
          {props.showVehicle && !props.recordId && (
            <AppAutocompleteField
              placeholder={messages['common.vehiclePlaceholder']}
              label={<IntlMessages id='common.vehicle' />}
              name='vehicle_id'
              variant='outlined'
              size='small'
              sx={{flex: 1}}
              dataLoading={props.vehiclesLoading}
              options={props.vehicles}
              keyName='vin'
              onSearch={props.searchVehicles}
              value={props.values?.vehicle_id}
              handleChange={({name, value}) => props.setfieldvalue(name, value)}
            />
          )}
          <AppAutocompleteField
            placeholder={messages['common.buyerPlaceholder']}
            label={<IntlMessages id='common.buyer' />}
            name='buyer_id'
            variant='outlined'
            size='small'
            sx={{flex: 1}}
            dataLoading={props.customersLoading}
            options={props.customers}
            keyName='fullname'
            onSearch={props.searchCustomers}
            value={props.values?.buyer_id}
            handleChange={({name, value}) => props.setfieldvalue(name, value)}
          />
          {props.recordId && (
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
              <MenuItem value='sold'>Sold</MenuItem>
              <MenuItem value='cancelled'>Cancelled</MenuItem>
              <MenuItem value='pending'>Pending</MenuItem>
            </AppTextField>
          )}
        </Stack>
        <Stack direction={{xs: 'column', md: 'row'}} spacing={5}>
          <AppTextField
            placeholder={messages['sale.salePricePlaceholder']}
            label={<IntlMessages id='sale.salePrice' />}
            name='sale_price'
            variant='outlined'
            size='small'
            sx={{flex: 1}}
          />
          <AppDateField
            label={<IntlMessages id='sale.saleDate' />}
            value={props.values?.sale_date}
            setfieldvalue={(name, value) => {
              props.setfieldvalue(
                name,
                value
                  ? value.getFullYear() +
                      '/' +
                      (value.getMonth() + 1) +
                      '/' +
                      value.getDate()
                  : '',
              );
            }}
            name='sale_date'
            size='small'
            sx={{flex: 1}}
          />
        </Stack>
        <Stack direction={{xs: 'column', md: 'row'}} spacing={5}>
          <AppTextField
            multiline
            rows={4}
            placeholder={messages['common.descriptionPlaceholder']}
            label={<IntlMessages id='common.description' />}
            name='description'
            variant='outlined'
            size='small'
            sx={{flex: 1}}
          />
        </Stack>
      </Stack>
    </Box>
  );
};

export default SaleForm;
SaleForm.propTypes = {
  values: PropTypes.object,
  setfieldvalue: PropTypes.func,
  customers: PropTypes.array,
  customersLoading: PropTypes.bool,
  searchCustomers: PropTypes.func,
  showVehicle: PropTypes.bool,
  vehicles: PropTypes.array,
  vehiclesLoading: PropTypes.bool,
  searchVehicles: PropTypes.func,
  recordId: PropTypes.any,
};
