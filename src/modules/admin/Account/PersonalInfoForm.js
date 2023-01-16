import AppAutocompleteField from '@crema/core/AppFormComponents/AppAutocompleteField';
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
import AppTooltip from '@crema/core/AppTooltip';
import {useEffect, useState} from 'react';
import {FETCH_ERROR, SHOW_MESSAGE} from 'shared/constants/ActionTypes';
import jwtAxios from '@crema/services/auth/jwt-auth';

const PersonalInfoForm = ({
  initialValues,
  profileUrl,
  setValues,
  isEmailVerified,
  setIsEmailVerified,
  setShowSendAgain,
  showSendAgain,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const {updateAuthUser} = useAuthMethod();
  const {messages} = useIntl();
  const dispatch = useDispatch();
  const {user} = useAuthUser();

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleSubmit = async (values) => {
    let newvalues = values;
    setValues((d) => {
      return {...d, ...newvalues};
    });
    const userFormData = Helper.getFormData(values);
    await dispatch(
      onUpdateAuthUser(`/auth_user`, userFormData, false, user, updateAuthUser),
    );
  };
  const verifyItNow = async (sendAgain = false) => {
    try {
      setIsLoading(true);
      const res = await jwtAxios.get(
        `/verify_email?send_again=${sendAgain ? 1 : 0}`,
      );
      if (res.status === 200 && res.data.result) {
        setShowSendAgain(sendAgain ? false : true);
        dispatch({
          type: SHOW_MESSAGE,
          payload: messages['message.emailSentToYou'],
        });
      } else if (res.status === 202 && res.data.result) {
        setShowSendAgain(true);
        dispatch({
          type: SHOW_MESSAGE,
          payload: messages['message.emailAlreadySent'],
        });
      } else {
        dispatch({
          type: FETCH_ERROR,
          payload: messages['message.somethingWentWrong'],
        });
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      dispatch({
        type: FETCH_ERROR,
        payload: messages['message.somethingWentWrong'],
      });
    }
  };

  return (
    <Formik
      validateOnBlur={false}
      enableReinitialize
      initialValues={initialValues}
      validationSchema={
        MyAccountConfigs(
          messages['validation.invalidPhone'],
          messages['validation.invalidWhatsapp'],
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
                    width={{xs: 80, md: 100}}
                    profileUrl={profileUrl}
                    name='profile'
                    setfieldvalue={setFieldValue}
                    title={<IntlMessages id='common.profile' />}
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
                  <Box sx={{flex: 1}}>
                    <AppTextField
                      placeholder={messages['common.emailPlaceholder']}
                      label={<IntlMessages id='common.email' />}
                      name='email'
                      variant='outlined'
                      size='small'
                      sx={{flex: 1, width: '100%'}}
                    />
                    {!isEmailVerified && (
                      <Typography
                        sx={{
                          mt: 1,
                          mx: 1,
                          fontSize: '13px',
                        }}
                        color='error'
                        component='p'
                      >
                        <IntlMessages id='common.emailNotVerified' />
                      </Typography>
                    )}
                  </Box>
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
                {user.type == 'Customer' && (
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
                )}
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
              {!isEmailVerified && (
                <LoadingButton
                  onClick={() => verifyItNow()}
                  loading={isLoading}
                  variant='contained'
                  color='secondary'
                  sx={{
                    minWidth: 100,
                    mr: 2,
                    mt: 2,
                  }}
                >
                  <IntlMessages id='common.verifyEmail' />
                </LoadingButton>
              )}
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
            {showSendAgain && (
              <Typography
                sx={{
                  m: 2,
                  fontSize: '13px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                }}
                component='p'
              >
                <Typography component='span' sx={{px: 1}}>
                  <IntlMessages id='common.notRecieved' />
                </Typography>
                <Button
                  color='primary'
                  variant='text'
                  onClick={() => verifyItNow(true)}
                >
                  <IntlMessages id='common.sendAgain' />
                </Button>
              </Typography>
            )}
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
  setValues: PropTypes.func,
  isEmailVerified: PropTypes.bool,
  setIsEmailVerified: PropTypes.bool,
  setShowSendAgain: PropTypes.func,
  showSendAgain: PropTypes.bool,
};
