import AppAutocompleteField from '@crema/core/AppFormComponents/AppAutocompleteField';
import {Box, Button, MenuItem, Stack, Typography} from '@mui/material';
import AppTextField from '@crema/core/AppFormComponents/AppTextField';
import AppDateField from '@crema/core/AppFormComponents/AppDateField';
import {useAuthMethod, useAuthUser} from '@crema/utility/AuthHooks';
import MyAccountConfigs from 'configs/pages/my-account';
import IntlMessages from '@crema/utility/IntlMessages';
import {appIntl} from '@crema/utility/helper/Utils';
import {Fonts} from 'shared/constants/AppEnums';
import SaveIcon from '@mui/icons-material/Save';
import {onUpdateAuthUser} from 'redux/actions';
import {useDispatch} from 'react-redux';
import {LoadingButton} from '@mui/lab';
import {Form, Formik} from 'formik';
import PropTypes from 'prop-types';

const InfoForm = ({initialValues, ...props}) => {
  const {messages} = appIntl('');
  const {updateAuthUser} = useAuthMethod();
  const dispatch = useDispatch();
  const {user} = useAuthUser();
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleSubmit = async (values) => {
    let newvalues = values;
    props.setValues((d) => {
      return {...d, ...newvalues};
    });
    await dispatch(
      onUpdateAuthUser(`/auth_user_data`, values, false, user, updateAuthUser),
    );
  };
  return (
    <Formik
      validateOnBlur={false}
      initialValues={initialValues}
      enableReinitialize
      validationSchema={MyAccountConfigs().validationSchema[2]}
      onSubmit={async (values, actions) => {
        actions.setSubmitting(true);
        await delay(0);
        await handleSubmit(values);
        actions.setSubmitting(false);
      }}
    >
      {({values, setFieldValue, isSubmitting, setFieldError, ...rest}) => {
        return (
          <Form>
            <Typography
              component='h3'
              sx={{
                fontSize: 16,
                fontWeight: Fonts.BOLD,
                mb: {xs: 3, lg: 5},
              }}
            >
              <IntlMessages id='common.information' />
            </Typography>
            <Stack spacing={{xs: 5, md: 8}}>
              {user.type == 'User' && (
                <Stack direction={{xs: 'column', md: 'row'}} spacing={5}>
                  <AppDateField
                    label={<IntlMessages id='common.birthDate' />}
                    name='birth_date'
                    value={values?.birth_date ? values?.birth_date : ''}
                    setfieldvalue={(name, value) => {
                      setFieldValue(
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
                    size='small'
                    sx={{flex: 1}}
                  />
                </Stack>
              )}
              <Stack direction={{xs: 'column', md: 'row'}} spacing={5}>
                <AppAutocompleteField
                  placeholder={messages['user.timezonePlaceholder']}
                  label={<IntlMessages id='user.timezone' />}
                  name='timezone'
                  variant='outlined'
                  size='small'
                  sx={{flex: 1}}
                  dataLoading={props.timezonesLoading}
                  options={props.timezones}
                  keyName='name'
                  idField='name'
                  onSearch={props.searchTimezones}
                  value={values?.timezone}
                  handleChange={({name, value}) => setFieldValue(name, value)}
                />
                <AppTextField
                  select
                  placeholder={messages['common.genderPlaceholder']}
                  label={<IntlMessages id='common.gender' />}
                  name='gender'
                  variant='outlined'
                  size='small'
                  value={values?.gender}
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
              {user.type == 'Customer' && (
                <>
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
                      value={values?.country_id}
                      handleChange={({name, value}) => {
                        setFieldValue(name, value);
                        setFieldValue('state_id', '');
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
                          country_id: values.country_id,
                          ...content,
                        })
                      }
                      value={values?.state_id}
                      handleChange={({name, value}) => {
                        props.searchCountries({state_id: value});
                        setFieldValue(name, value);
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
                </>
              )}
            </Stack>
            <Box
              sx={{
                mt: 3,
                display: 'flex',
                flexWrap: 'wrap',
              }}
            >
              <LoadingButton
                loading={isSubmitting}
                loadingPosition='start'
                startIcon={<SaveIcon />}
                variant='contained'
                type='submit'
                sx={{
                  minWidth: 100,
                  mr: 2,
                  mt: 2,
                }}
              >
                <IntlMessages id='common.saveChanges' />
              </LoadingButton>
              <Button
                sx={{
                  minWidth: 100,
                  mt: 2,
                }}
                color='primary'
                variant='outlined'
                onClick={() => rest.setValues(initialValues)}
              >
                <IntlMessages id='common.cancel' />
              </Button>
            </Box>
          </Form>
        );
      }}
    </Formik>
  );
};

export default InfoForm;
InfoForm.propTypes = {
  initialValues: PropTypes.object,
  countries: PropTypes.array,
  countriesLoading: PropTypes.bool,
  searchCountries: PropTypes.func,
  states: PropTypes.array,
  statesLoading: PropTypes.bool,
  searchStates: PropTypes.func,
  timezones: PropTypes.array,
  timezonesLoading: PropTypes.bool,
  searchTimezones: PropTypes.func,
  setValues: PropTypes.func,
};
