import AppTextField from '@crema/core/AppFormComponents/AppTextField';
import {useAuthMethod, useAuthUser} from '@crema/utility/AuthHooks';
import MyAccountConfigs from 'configs/pages/my-account';
import IntlMessages from '@crema/utility/IntlMessages';
import {Box, Stack, Typography} from '@mui/material';
import {Fonts} from 'shared/constants/AppEnums';
import SaveIcon from '@mui/icons-material/Save';
import {onUpdateAuthUser} from 'redux/actions';
import Profile from 'components/Profile';
import {useDispatch} from 'react-redux';
import {LoadingButton} from '@mui/lab';
import {Button} from '@mui/material';
import Helper from 'helpers/helpers';
import {Form, Formik} from 'formik';
import PropTypes from 'prop-types';
import {useIntl} from 'react-intl';

const PersonalInfoForm = ({profileUrl, initialValues}) => {
  const {updateAuthUser} = useAuthMethod();
  const {messages} = useIntl();
  const dispatch = useDispatch();
  const {user} = useAuthUser();
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const handleSubmit = async (values) => {
    const userFormData = Helper.getFormData(values);
    dispatch(
      onUpdateAuthUser(`/auth_user/`, userFormData, user, updateAuthUser),
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
        ).validationSchema[0]
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
                mb: {xs: 3, lg: 4},
              }}
            >
              <IntlMessages id='common.personalInfo' />
            </Typography>
            <Box>
              <Stack spacing={{xs: 5, md: 8}}>
                <Stack direction='row' spacing={5} sx={{mx: 'auto'}}>
                  <Profile
                    width={{xs: 70, lg: 100}}
                    profileUrl={profileUrl}
                    name='profile'
                    setfieldvalue={setFieldValue}
                  />
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
                </Stack>
                <Stack direction={{xs: 'column', md: 'row'}} spacing={5}>
                  <AppTextField
                    placeholder={messages['common.emailPlaceholder']}
                    label={<IntlMessages id='common.email' />}
                    name='email'
                    variant='outlined'
                    size='small'
                    sx={{flex: 1}}
                  />
                  <AppTextField
                    placeholder={messages['common.usernamePlaceholder']}
                    label={<IntlMessages id='common.username' />}
                    name='username'
                    variant='outlined'
                    size='small'
                    sx={{flex: 1}}
                  />
                </Stack>
                <Stack direction={{xs: 'column', md: 'row'}} spacing={5}>
                  <AppTextField
                    placeholder={messages['common.phonePlaceholder']}
                    label={<IntlMessages id='common.phone' />}
                    name='phone'
                    variant='outlined'
                    size='small'
                    sx={{flex: 1}}
                  />
                  <AppTextField
                    placeholder={messages['common.whatsappPlaceholder']}
                    label={<IntlMessages id='common.whatsapp' />}
                    name='whatsapp'
                    variant='outlined'
                    size='small'
                    sx={{flex: 1}}
                  />
                </Stack>
              </Stack>
            </Box>
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

export default PersonalInfoForm;
PersonalInfoForm.propTypes = {
  profileUrl: PropTypes.any,
  initialValues: PropTypes.object,
};
