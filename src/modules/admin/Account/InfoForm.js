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
import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {LoadingButton} from '@mui/lab';
import {Form, Formik} from 'formik';
import PropTypes from 'prop-types';
import {getData} from 'configs';

const InfoForm = ({initialValues}) => {
  const {messages} = appIntl('');
  const {updateAuthUser} = useAuthMethod();
  const dispatch = useDispatch();
  const {user} = useAuthUser();
  const [timezones, setTimezones] = useState([]);
  const [timezonesLoading, setTimezonesLoading] = useState(false);
  useEffect(() => {
    getData(`/timezones/auto_complete`, {}, setTimezonesLoading, setTimezones);
  }, []);

  const searchTimezones = (content) => {
    getData(
      `/timezones/auto_complete`,
      content,
      setTimezonesLoading,
      setTimezones,
    );
  };
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleSubmit = async (values) => {
    dispatch(
      onUpdateAuthUser(`/auth_user_data/`, values, user, updateAuthUser),
    );
  };
  return (
    <Formik
      validateOnBlur={false}
      initialValues={initialValues}
      enableReinitialize
      validationSchema={
        MyAccountConfigs(
          messages['validation.invalidPhone'],
          messages['validation.invalidWhatsapp'],
          messages['validation.passwordMisMatch'],
        ).validationSchema[2]
      }
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
              <Stack direction={{xs: 'column', md: 'row'}} spacing={5}>
                <AppAutocompleteField
                  placeholder={messages['user.timezonePlaceholder']}
                  label={<IntlMessages id='user.timezone' />}
                  name='timezone'
                  variant='outlined'
                  size='small'
                  sx={{flex: 1}}
                  dataLoading={timezonesLoading}
                  options={timezones}
                  keyName='name'
                  idField='name'
                  onSearch={searchTimezones}
                  value={values?.timezone}
                  handleChange={({name, value}) => setFieldValue(name, value)}
                />
              </Stack>
              <Stack direction={{xs: 'column', md: 'row'}} spacing={5}>
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
                <AppDateField
                  label={<IntlMessages id='common.birthDate' />}
                  name='birth_date'
                  value={values?.birth_date ? values?.birth_date : ''}
                  setfieldvalue={(name, value) => {
                    console.log(name, value);
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
                type='cancel'
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
};
