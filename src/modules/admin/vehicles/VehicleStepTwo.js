import AppAutocompleteField from '@crema/core/AppFormComponents/AppAutocompleteField';
import AppTextField from '@crema/core/AppFormComponents/AppTextField';
import VehicleConfigs from '../../../configs/pages/vehicles';
import IntlMessages from '@crema/utility/IntlMessages';
import MenuItem from '@mui/material/MenuItem';
import {Box, Stack} from '@mui/material';
import {useIntl} from 'react-intl';
import PropTypes from 'prop-types';

const VehicleStepTwo = (props) => {
  const {messages} = useIntl();
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
          <AppAutocompleteField
            placeholder={messages['vehicle.sellerPlaceholder']}
            label={<IntlMessages id='vehicle.seller' />}
            name='seller_id'
            variant='outlined'
            size='small'
            sx={{flex: 1, width: '100%'}}
            dataLoading={props.sellerLoading}
            options={props.sellers}
            keyName='fullname'
            onSearch={props.searchSellers}
            value={props.values?.seller_id}
            handleChange={({name, value}) => props.setfieldvalue(name, value)}
          />
        </Stack>
        <Stack direction={{xs: 'column', md: 'row'}} spacing={5}>
          <AppTextField
            select
            label={<IntlMessages id='common.status' />}
            name='status'
            variant='outlined'
            size='small'
            value={props.values?.status}
            disabled={props.values?.status == 'sold'}
            sx={{flex: 1}}
          >
            {props.values?.status == 'sold'
              ? VehicleConfigs().statuses.map((status, index) => (
                  <MenuItem value={status} key={index}>
                    <Box sx={{textTransform: 'capitalize'}}>{status}</Box>
                  </MenuItem>
                ))
              : VehicleConfigs().statuses.map(
                  (status, index) =>
                    status != 'sold' && (
                      <MenuItem value={status} key={index}>
                        <Box sx={{textTransform: 'capitalize'}}>{status}</Box>
                      </MenuItem>
                    ),
                )}
          </AppTextField>
          <AppTextField
            placeholder={messages['vehicle.primary_damagePlaceholder']}
            label={<IntlMessages id='vehicle.primary_damage' />}
            name='primary_damage'
            variant='outlined'
            size='small'
            sx={{flex: 1}}
          />
        </Stack>
        <Stack direction={{xs: 'column', md: 'row'}} spacing={5}>
          <AppTextField
            select
            clearable
            label={<IntlMessages id='vehicle.fuel' />}
            name='fuel'
            variant='outlined'
            size='small'
            value={props.values?.fuel}
            sx={{flex: 1}}
          >
            <MenuItem value=''>
              <IntlMessages id='common.none' />
            </MenuItem>
            {VehicleConfigs().fuels.map((fuel, index) => (
              <MenuItem key={index} value={fuel}>
                <Box sx={{textTransform: 'capitalize'}}>{fuel}</Box>
              </MenuItem>
            ))}
          </AppTextField>
          <AppTextField
            placeholder={messages['vehicle.engineTypePlaceholder']}
            label={<IntlMessages id='vehicle.engineType' />}
            name='engine_type'
            variant='outlined'
            size='small'
            sx={{flex: 1}}
          />
        </Stack>
        <Stack direction={{xs: 'column', md: 'row'}} spacing={5}>
          <AppTextField
            select
            clearable
            label={<IntlMessages id='vehicle.body_style' />}
            name='body_style'
            variant='outlined'
            size='small'
            value={props.values?.body_style}
            sx={{flex: 1}}
          >
            <MenuItem value=''>
              <IntlMessages id='common.none' />
            </MenuItem>
            {VehicleConfigs().bodyStyles.map((bodyStyle, index) => (
              <MenuItem key={index} value={bodyStyle}>
                <Box sx={{textTransform: 'capitalize'}}>{bodyStyle}</Box>
              </MenuItem>
            ))}
          </AppTextField>
          <AppTextField
            placeholder={messages['vehicle.drive_typePlaceholder']}
            label={<IntlMessages id='vehicle.drive_type' />}
            name='drive_type'
            variant='outlined'
            size='small'
            sx={{flex: 1}}
          />
        </Stack>
        <Stack direction={{xs: 'column', md: 'row'}} spacing={5}>
          <AppTextField
            placeholder={messages['vehicle.cylinderPlaceholder']}
            label={<IntlMessages id='vehicle.cylinder' />}
            name='cylinder'
            variant='outlined'
            size='small'
            sx={{flex: 1}}
          />
          <AppTextField
            select
            clearable
            label={<IntlMessages id='vehicle.transmission' />}
            name='transmission'
            variant='outlined'
            size='small'
            value={props.values?.transmission}
            sx={{flex: 1}}
          >
            <MenuItem value=''>
              <IntlMessages id='common.none' />
            </MenuItem>
            {VehicleConfigs().transmissions.map((transmission, key) => (
              <MenuItem key={key} value={transmission}>
                <Box sx={{textTransform: 'capitalize'}}>{transmission}</Box>
              </MenuItem>
            ))}
          </AppTextField>
        </Stack>
        <Stack direction={{xs: 'column', md: 'row'}} spacing={5}>
          <AppTextField
            placeholder={messages['vehicle.odometerPlaceholder']}
            label={<IntlMessages id='vehicle.odometer' />}
            name='odometer_type'
            variant='outlined'
            size='small'
            sx={{flex: 1}}
          />
          <AppTextField
            placeholder={messages['vehicle.document_typePlaceholder']}
            label={<IntlMessages id='vehicle.document_type' />}
            name='document_type'
            variant='outlined'
            size='small'
            sx={{flex: 1}}
          />
        </Stack>
      </Stack>
    </Box>
  );
};

export default VehicleStepTwo;

VehicleStepTwo.propTypes = {
  values: PropTypes.object,
  setfieldvalue: PropTypes.func,
  makesLoading: PropTypes.bool,
  makes: PropTypes.array,
  searchMakes: PropTypes.func,
  modelsLoading: PropTypes.bool,
  models: PropTypes.array,
  searchModels: PropTypes.func,
  locationLoading: PropTypes.bool,
  locations: PropTypes.array,
  searchLocations: PropTypes.func,
  sellerLoading: PropTypes.bool,
  sellers: PropTypes.array,
  searchSellers: PropTypes.func,
};
