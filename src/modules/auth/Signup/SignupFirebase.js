import {AiOutlineGoogle, AiOutlineTwitter} from 'react-icons/ai';
import IntlMessages from '@crema/utility/IntlMessages';
import {useAuthMethod} from '@crema/utility/AuthHooks';
import CustomerConfigs from 'configs/pages/customers';
import {useDispatch} from 'react-redux/es/exports';
import IconButton from '@mui/material/IconButton';
import {Fonts} from 'shared/constants/AppEnums';
import SaveIcon from '@mui/icons-material/Save';
import {onSignUpCustomer} from 'redux/actions';
import Checkbox from '@mui/material/Checkbox';
import {FaFacebookF} from 'react-icons/fa';
import Button from '@mui/material/Button';
import {availableChecking} from 'configs';
import {BsGithub} from 'react-icons/bs';
import SignUpModal from './SignUpModal';
import {useRef, useState} from 'react';
import {LoadingButton} from '@mui/lab';
import helpers from 'helpers/helpers';
import {useRouter} from 'next/router';
import {Form, Formik} from 'formik';
import Box from '@mui/material/Box';
import {useIntl} from 'react-intl';
import Link from 'next/link';

const SignupFirebase = () => {
  const [showTermsError, setShowTermsError] = useState(false);
  const profileUrl = useRef();
  const {messages} = useIntl();
  const dispatch = useDispatch();
  const {signInUser} = useAuthMethod();
  const router = useRouter();

  const validationSchema = CustomerConfigs(
    messages['validation.invalidPhone'],
    messages['validation.invalidWhatsapp'],
    messages['validation.passwordMisMatch'],
  ).signupSchema;

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleSubmit = async (values, actions) => {
    if (await stepTwoValidation(values, actions)) {
      const userFormData = helpers.getFormData(values);
      dispatch(onSignUpCustomer(userFormData, values, signInUser));
      router.push('/my-account');
      actions.setTouched({});
    }
  };

  const stepTwoValidation = async (values, actions) => {
    const params = {
      username: values.username,
      email: values.email,
      whatsapp: values.whatsapp,
      phone: values.phone,
    };
    if (values.username && values.email) {
      return availableChecking(
        'loginables/valid_credential_all',
        params,
        actions,
        onSuccess,
        onFail,
      );
    }
    return true;
  };

  const onSuccess = (res, actions) => {
    let errors = {};
    if (!res.data.result) {
      if (res.data.message?.includes(1)) {
        errors.email = <IntlMessages id='validation.notUniqueEmail' />;
      }
      if (res.data.message?.includes(2)) {
        errors.username = <IntlMessages id='validation.notUniqueUsername' />;
      }
      if (res.data.message?.includes(3)) {
        errors.phone = <IntlMessages id='validation.notUniquePhone' />;
      }
      if (res.data.message?.includes(4)) {
        errors.whatsapp = <IntlMessages id='validation.notUniqueWhatsapp' />;
      }
      actions.setErrors(errors);
    }
  };
  const onFail = (actions) => {
    actions.setErrors({
      username: <IntlMessages id='validation.notUniqueUsername' />,
      email: <IntlMessages id='validation.notUniqueEmail' />,
      whatsapp: <IntlMessages id='validation.notUniqueWhatsapp' />,
      phone: <IntlMessages id='validation.notUniquePhone' />,
    });
  };

  return (
    <Box sx={{flex: 1, display: 'flex', flexDirection: 'column'}}>
      <Box sx={{flex: 1, display: 'flex', flexDirection: 'column', mb: 5}}>
        <Formik
          validateOnChange={true}
          initialValues={{
            profile: '',
            fullname: '',
            phone: '',
            whatsapp: '',
            gender: '',
            email: '',
            username: '',
            password: '',
            password_confirmation: '',
            timezone: '',
            terms: false,
          }}
          validationSchema={validationSchema}
          onSubmit={async (data, actions) => {
            actions.setSubmitting(true);
            await delay(0);
            await handleSubmit(data, actions);
            actions.setSubmitting(false);
          }}
        >
          {({values, isSubmitting, ...actions}) => (
            <Form style={{textAlign: 'left'}} noValidate autoComplete='off'>
              <SignUpModal
                profileUrl={profileUrl}
                values={values}
                setfieldvalue={actions.setFieldValue}
              />
              <Box>
                <Box
                  sx={{
                    mt: 2,
                    display: 'flex',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <Checkbox
                      sx={{
                        ml: -3,
                      }}
                      name='terms'
                      value={values.terms}
                      checked={values.terms}
                      onChange={() => {
                        setShowTermsError(values.terms);
                        actions.setFieldValue('terms', values.terms ? 0 : 1);
                      }}
                    />
                    <Box
                      component='span'
                      sx={{
                        mr: 2,
                        color: 'grey.500',
                      }}
                    >
                      <IntlMessages id='common.iAgreeTo' />
                    </Box>
                  </Box>
                  <Box
                    component='span'
                    sx={{
                      color: (theme) => theme.palette.primary.main,
                      cursor: 'pointer',
                    }}
                  >
                    <Link href='/terms' target='_blank'>
                      <IntlMessages id='common.termConditions' />
                    </Link>
                  </Box>
                </Box>
                {showTermsError == true && (
                  <Box
                    component='span'
                    sx={{
                      color: (theme) => theme.palette.error.main,
                      cursor: 'pointer',
                    }}
                  >
                    <IntlMessages id='validation.requiredField' />
                  </Box>
                )}
              </Box>
              <LoadingButton
                onClick={() => {
                  if (!values.terms) {
                    setShowTermsError(true);
                  }
                }}
                loading={isSubmitting}
                loadingPosition='start'
                startIcon={<SaveIcon />}
                variant='contained'
                type='submit'
                sx={{
                  mt: {xs: 3, xl: 4},
                  minWidth: 160,
                  fontWeight: Fonts.REGULAR,
                  fontSize: 16,
                  textTransform: 'capitalize',
                  padding: '4px 16px 8px',
                }}
              >
                <IntlMessages id='common.signup' />
              </LoadingButton>
            </Form>
          )}
        </Formik>
      </Box>

      <Box
        sx={{
          color: 'grey.500',
          mb: {xs: 5, md: 7},
        }}
      >
        <span style={{marginRight: 4}}>
          <IntlMessages id='common.alreadyHaveAccount' />
        </span>
        <Box
          component='span'
          sx={{
            fontWeight: Fonts.MEDIUM,
            '& a': {
              color: (theme) => theme.palette.primary.main,
              textDecoration: 'none',
            },
          }}
        >
          <Link href='/signin'>
            <IntlMessages id='common.signIn' />
          </Link>
        </Box>
      </Box>

      {/* <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: (theme) => theme.palette.background.default,
          mx: {xs: -5, lg: -10},
          mb: {xs: -6, lg: -11},
          mt: 'auto',
          py: 2,
          px: {xs: 5, lg: 10},
        }}
      >
        <Box
          sx={{
            color: (theme) => theme.palette.text.secondary,
          }}
        >
          <IntlMessages id='common.orLoginWith' />
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <IconButton
            sx={{p: 2, '& svg': {fontSize: 18}}}
            onClick={() => signInWithPopup('google')}
          >
            <AiOutlineGoogle />
          </IconButton>
          <IconButton
            sx={{
              p: 1.5,
              '& svg': {fontSize: 18},
            }}
            onClick={() => signInWithPopup('facebook')}
          >
            <FaFacebookF />
          </IconButton>
          <IconButton
            sx={{
              p: 1.5,
              '& svg': {fontSize: 18},
            }}
            onClick={() => signInWithPopup('github')}
          >
            <BsGithub />
          </IconButton>
          <IconButton
            sx={{
              p: 1.5,
              '& svg': {fontSize: 18},
            }}
            onClick={() => signInWithPopup('twitter')}
          >
            <AiOutlineTwitter />
          </IconButton>
        </Box>
      </Box> */}
    </Box>
  );
};

export default SignupFirebase;
