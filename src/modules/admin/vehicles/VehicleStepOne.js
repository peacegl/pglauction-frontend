import AppAutocompleteField from '@crema/core/AppFormComponents/AppAutocompleteField';
import AppTextField from '@crema/core/AppFormComponents/AppTextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import IntlMessages from '@crema/utility/IntlMessages';
import {Box, Stack, Paper} from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import {useIntl} from 'react-intl';
import PropTypes from 'prop-types';
import {useEffect} from 'react';
import {useField} from 'formik';

const VehicleStepOne = (props) => {
  const {messages} = useIntl();
  const [field] = useField('test');
  useEffect(() => {
    if (props.makes.length == 1) {
      props.setfieldvalue('make', props.makes[0]?.id);
    }
  }, [props.makes]);

  return (
    <Box>
      <Stack spacing={{xs: 5, md: 8}}>
        <Stack direction={{xs: 'column', md: 'row'}} spacing={5}>
          {/* <AppAutocompleteField
            placeholder={messages['common.makePlaceholder']}
            label={<IntlMessages id='common.make' />}
            name='make'
            variant='outlined'
            size='small'
            sx={{flex: 1, width: '100%'}}
            dataLoading={props.makesLoading}
            options={props.makes}
            keyName='name'
            onSearch={props.searchMakes}
            value={props.values?.make}
            handleChange={({name, value}) => {
              props.setfieldvalue(name, value);
              props.setfieldvalue('model', '');
              props.searchModels({make: value});
            }}
          />
          <AppAutocompleteField
            placeholder={messages['vehicle.modelPlaceholder']}
            label={<IntlMessages id='vehicle.model' />}
            name='model'
            variant='outlined'
            size='small'
            sx={{flex: 1, width: '100%'}}
            dataLoading={props.modelsLoading}
            options={props.models}
            keyName='name'
            onSearch={(content) =>
              props.searchModels({make: props.values.make, ...content})
            }
            value={props.values?.model}
            handleChange={({name, value}) => {
              props.searchMakes({model: value});
              props.setfieldvalue(name, value);
            }}
          /> */}

          <AppTextField
            placeholder={messages['vehicle.makePlaceholder']}
            label={<IntlMessages id='common.make' />}
            name='make'
            variant='outlined'
            size='small'
            sx={{flex: 1}}
          />
          <AppTextField
            placeholder={messages['vehicle.modelPlaceholder']}
            label={<IntlMessages id='vehicle.model' />}
            name='model'
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
            placeholder={messages['vehicle.yearPlaceholder']}
            label={<IntlMessages id='common.year' />}
            name='year'
            variant='outlined'
            size='small'
            sx={{flex: 1}}
          />
          <AppTextField
            placeholder={messages['common.pricePlaceholder']}
            label={<IntlMessages id='common.price' />}
            name='price'
            variant='outlined'
            size='small'
            sx={{flex: 1}}
          />
        </Stack>
        <Stack direction={{xs: 'column', md: 'row'}} spacing={5}>
          <AppTextField
            placeholder={messages['vehicle.exterior_colorPlaceholder']}
            label={<IntlMessages id='vehicle.exterior_color' />}
            name='exterior_color'
            variant='outlined'
            size='small'
            sx={{flex: 1}}
          />
          <AppTextField
            placeholder={messages['vehicle.interior_colorPlaceholder']}
            label={<IntlMessages id='vehicle.interior_color' />}
            name='interior_color'
            variant='outlined'
            size='small'
            sx={{flex: 1}}
          />
        </Stack>
        <Stack direction={{xs: 'column', md: 'row'}} spacing={5}>
          <Paper
            variant='outlined'
            sx={{
              borderRadius: 1,
              flex: 2,
              display: 'flex',
              pl: 4,
            }}
          >
            <FormControlLabel
              label={<IntlMessages id='vehicle.is_featured' />}
              control={
                <Checkbox
                  size='small'
                  name='is_featured'
                  value={props.values.is_featured}
                  checked={props.values.is_featured}
                  onChange={() =>
                    props.setfieldvalue(
                      'is_featured',
                      props.values.is_featured ? 0 : 1,
                    )
                  }
                />
              }
            />
            <FormControlLabel
              label={<IntlMessages id='vehicle.keys' />}
              control={
                <Checkbox
                  size='small'
                  name='keys'
                  value={props.values.keys}
                  checked={props.values.keys}
                  onChange={() =>
                    props.setfieldvalue('keys', props.values.keys ? 0 : 1)
                  }
                />
              }
            />
            <FormControlLabel
              sx={{mx: 4}}
              label={<IntlMessages id='vehicle.test_drive' />}
              control={
                <Checkbox
                  size='small'
                  name='test_drive'
                  value={props.values.test_drive}
                  checked={props.values.test_drive}
                  onChange={() =>
                    props.setfieldvalue(
                      'test_drive',
                      props.values.test_drive ? 0 : 1,
                    )
                  }
                />
              }
            />
          </Paper>
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
