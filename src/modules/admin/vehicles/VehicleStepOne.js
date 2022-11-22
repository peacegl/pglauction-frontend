import AppAutocompleteField from '@crema/core/AppFormComponents/AppAutocompleteField';
import AppTextField from '@crema/core/AppFormComponents/AppTextField';
import IntlMessages from '@crema/utility/IntlMessages';
import {Box, Stack} from '@mui/material';
import {useIntl} from 'react-intl';
import {useEffect} from 'react';
import PropTypes from 'prop-types';

const VehicleStepOne = (props) => {
  const {messages} = useIntl();

  return (
    <Box>
      <Stack spacing={{xs: 5, md: 8}}>
        <Stack direction={{xs: 'column', md: 'row'}} spacing={5}>
          <AppAutocompleteField
            placeholder={messages['vehicle.makePlaceholder']}
            label={<IntlMessages id='vehicle.make' />}
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
          <AppAutocompleteField
            placeholder={messages['vehicle.modelPlaceholder']}
            label={<IntlMessages id='vehicle.model' />}
            name='model_id'
            variant='outlined'
            size='small'
            sx={{flex: 1, width: '100%'}}
            dataLoading={props.modelsLoading}
            options={props.models}
            keyName='name'
            onSearch={props.searchModels}
            value={props.values?.model_id}
            handleChange={({name, value}) => props.setfieldvalue(name, value)}
          />
        </Stack>
        <Stack direction={{xs: 'column', md: 'row'}} spacing={5}>
          <AppTextField
            placeholder={messages['vehicle.modelPlaceholder']}
            label={<IntlMessages id='vehicle.model' />}
            name='model'
            variant='outlined'
            size='small'
            sx={{flex: 1}}
          />
          <AppTextField
            placeholder={messages['vehicle.yearPlaceholder']}
            label={<IntlMessages id='common.year' />}
            name='year'
            variant='outlined'
            size='small'
            sx={{flex: 1}}
          />
        </Stack>
        <Stack direction={{xs: 'column', md: 'row'}} spacing={5}>
          <AppTextField
            placeholder={messages['vehicle.vinPlaceholder']}
            label={<IntlMessages id='vehicle.vin' />}
            name='vin'
            variant='outlined'
            size='small'
            sx={{flex: 1}}
          />
          <AppTextField
            placeholder={messages['vehicle.lotNumberPlaceholder']}
            label={<IntlMessages id='vehicle.lotNumber' />}
            name='lot_number'
            variant='outlined'
            size='small'
            sx={{flex: 1}}
          />
        </Stack>
        <Stack direction={{xs: 'column', md: 'row'}} spacing={5}>
          <AppTextField
            placeholder={messages['vehicle.colorPlaceholder']}
            label={<IntlMessages id='vehicle.color' />}
            name='color'
            variant='outlined'
            size='small'
            sx={{flex: 1}}
          />
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
            placeholder={messages['vehicle.cylindersPlaceholder']}
            label={<IntlMessages id='vehicle.cylinders' />}
            name='cylinders'
            variant='outlined'
            size='small'
            sx={{flex: 1}}
          />
          <AppTextField
            placeholder={messages['vehicle.vehicleTypePlaceholder']}
            label={<IntlMessages id='vehicle.vehicleType' />}
            name='vehicle_type'
            variant='outlined'
            size='small'
            sx={{flex: 1}}
          />
        </Stack>
      </Stack>
    </Box>
  );
};

export default VehicleStepOne;

VehicleStepOne.propTypes = {
  values: PropTypes.object,
  setfieldvalue: PropTypes.func,
  makesLoading: PropTypes.bool,
  makes: PropTypes.array,
  searchMakes: PropTypes.func,
  modelsLoading: PropTypes.bool,
  models: PropTypes.array,
  searchModels: PropTypes.func,
};
