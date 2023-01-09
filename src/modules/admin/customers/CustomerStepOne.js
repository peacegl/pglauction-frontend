import AppAutocompleteField from '@crema/core/AppFormComponents/AppAutocompleteField';
import AppTextField from '@crema/core/AppFormComponents/AppTextField';
import IntlMessages from '@crema/utility/IntlMessages';
import Profile from 'components/Profile';
import {useIntl} from 'react-intl';
import PropTypes from 'prop-types';
import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Stack,
} from '@mui/material';
import SingleImageDropzone from 'components/dropzone/SingleImageDropzone';

const CustomerStepOne = (props) => {
  const {messages} = useIntl();

  return (
    <Stack spacing={{xs: 5, md: 8}}>
      <Stack direction='row' spacing={5} alignItems='center'>
        <Box sx={{flex: 1}}>
          <Profile
            width={{xs: 80, md: 100}}
            profileUrl={props.profileUrl}
            name='profile'
            setfieldvalue={props.setfieldvalue}
            title={<IntlMessages id='common.profile' />}
          />
        </Box>
        <FormControl sx={{flex: 1}}>
          <FormLabel id='demo-row-radio-buttons-group-label'>
            <IntlMessages id='customer.business_type' />
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby='demo-row-radio-buttons-group-label'
            name='row-radio-buttons-group'
            value={props.values?.is_business}
            onChange={(e) => props.setfieldvalue('is_business', e.target.value)}
          >
            <FormControlLabel
              value={1}
              control={<Radio />}
              label={<IntlMessages id='common.business' />}
            />
            <FormControlLabel
              value={0}
              control={<Radio />}
              label={<IntlMessages id='common.individual' />}
            />
          </RadioGroup>
        </FormControl>
      </Stack>
      <Stack direction={{xs: 'column', md: 'row'}} spacing={5}>
        <AppTextField
          placeholder={messages['common.fullnamePlaceholder']}
          label={<IntlMessages id='common.fullname' />}
          name='fullname'
          variant='outlined'
          size='small'
          sx={{flex: 1}}
        />
        <AppTextField
          placeholder={messages['common.phonePlaceholder']}
          label={<IntlMessages id='common.phone' />}
          name='phone'
          variant='outlined'
          size='small'
          sx={{flex: 1}}
        />
      </Stack>
      <Stack direction={{xs: 'column', md: 'row'}} spacing={5}>
        <AppTextField
          placeholder={messages['common.whatsappPlaceholder']}
          label={<IntlMessages id='common.whatsapp' />}
          name='whatsapp'
          variant='outlined'
          size='small'
          sx={{flex: 1}}
        />
        <AppTextField
          select
          placeholder={messages['common.genderPlaceholder']}
          label={<IntlMessages id='common.gender' />}
          name='gender'
          variant='outlined'
          size='small'
          value={props.values?.gender}
          sx={{flex: 1}}
        >
          <MenuItem value='male'>
            <IntlMessages id='common.male' />
          </MenuItem>
          <MenuItem value='female'>
            <IntlMessages id='common.female' />
          </MenuItem>
        </AppTextField>
      </Stack>
      <Stack direction={{xs: 'column', md: 'row'}} spacing={5}>
        <AppAutocompleteField
          placeholder={messages['common.countryPlaceholder']}
          label={<IntlMessages id='common.country' />}
          name='country_id'
          variant='outlined'
          size='small'
          sx={{flex: 1}}
          dataLoading={props.countriesLoading}
          options={props.countries}
          keyName='name'
          onSearch={props.searchCountries}
          value={props.values?.country_id}
          handleChange={({name, value}) => {
            props.setfieldvalue(name, value);
            props.setfieldvalue('state_id', '');
            props.searchStates({country_id: value});
          }}
        />
        <AppAutocompleteField
          placeholder={messages['common.statePlaceholder']}
          label={<IntlMessages id='common.state' />}
          name='state_id'
          variant='outlined'
          size='small'
          sx={{flex: 1}}
          dataLoading={props.statesLoading}
          options={props.states}
          keyName='name'
          onSearch={(content) =>
            props.searchStates({
              country_id: props.values.country_id,
              ...content,
            })
          }
          value={props.values?.state_id}
          handleChange={({name, value}) => {
            props.searchCountries({state_id: value});
            props.setfieldvalue(name, value);
          }}
        />
      </Stack>
      <Stack direction={{xs: 'column', md: 'row'}} spacing={5}>
        <AppTextField
          placeholder={messages['common.cityPlaceholder']}
          label={<IntlMessages id='common.city' />}
          name='city'
          variant='outlined'
          size='small'
          sx={{flex: 1}}
        />
        <AppTextField
          placeholder={messages['common.zipCodePlaceholder']}
          label={<IntlMessages id='common.zipCode' />}
          name='zip_code'
          variant='outlined'
          size='small'
          sx={{flex: 1}}
        />
      </Stack>
      <Stack direction={{xs: 'column', md: 'row'}} spacing={5}>
        <AppTextField
          placeholder={messages['common.address_line_1']}
          label={<IntlMessages id='common.address_line_1' />}
          name='address_line_1'
          variant='outlined'
          size='small'
          sx={{flex: 1}}
        />
        <AppTextField
          placeholder={messages['common.address_line_2']}
          label={<IntlMessages id='common.address_line_2' />}
          name='address_line_2'
          variant='outlined'
          size='small'
          sx={{flex: 1}}
        />
      </Stack>
      <Stack
        direction={{xs: 'column', md: 'row'}}
        spacing={5}
        alignItems='center'
      >
        <AppTextField
          placeholder={messages['common.companyPlaceholder']}
          label={<IntlMessages id='common.company' />}
          name='company'
          variant='outlined'
          size='small'
          sx={{flex: 1}}
        />
        <Box sx={{flex: 1, display: 'flex'}}>
          <SingleImageDropzone
            text={
              <>
                <IntlMessages id='common.identificationProof' />
                <Box sx={{textAlign: 'center'}}>
                  {props.values?.is_business == 1 && (
                    <>
                      (<IntlMessages id='customer.companyLicense' />)
                    </>
                  )}
                  {props.values?.is_business == 0 && (
                    <>
                      (<IntlMessages id='customer.passport_id' />)
                    </>
                  )}
                </Box>
              </>
            }
            width={220}
            height={'auto'}
            image={props.identificationProof}
            name='identification_proof'
            setfieldvalue={props.setfieldvalue}
            setImage={props.setIdentificationProof}
            isImageValid={true}
            disableCrop
          />
        </Box>
      </Stack>
    </Stack>
  );
};

export default CustomerStepOne;
CustomerStepOne.propTypes = {
  values: PropTypes.object,
  setfieldvalue: PropTypes.func,
  profileUrl: PropTypes.string,
  countries: PropTypes.array,
  countriesLoading: PropTypes.bool,
  searchCountries: PropTypes.func,
  states: PropTypes.array,
  statesLoading: PropTypes.bool,
  searchStates: PropTypes.func,
  identificationProof: PropTypes.object,
  setIdentificationProof: PropTypes.func,
};
