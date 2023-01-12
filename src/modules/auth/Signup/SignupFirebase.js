import CustomerStepOne from 'modules/admin/customers/CustomerStepOne';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {AiOutlineGoogle, AiOutlineTwitter} from 'react-icons/ai';
import IntlMessages from '@crema/utility/IntlMessages';
import {useAuthMethod} from '@crema/utility/AuthHooks';
import GppGoodIcon from '@mui/icons-material/GppGood';
import CustomerConfigs from 'configs/pages/customers';
import SignupStepperModal from './SignupStepperModal';
import PersonIcon from '@mui/icons-material/Person';
import {availableChecking, getData} from 'configs';
import {useEffect, useRef, useState} from 'react';
import IconButton from '@mui/material/IconButton';
import {Fonts} from 'shared/constants/AppEnums';
import SaveIcon from '@mui/icons-material/Save';
import {onSignUpCustomer} from 'redux/actions';
import Checkbox from '@mui/material/Checkbox';
import SignupStepTwo from './SignupStepTwo';
import {FaFacebookF} from 'react-icons/fa';
import Button from '@mui/material/Button';
import {BsGithub} from 'react-icons/bs';
import {useDispatch} from 'react-redux';
import helpers from 'helpers/helpers';
import Box from '@mui/material/Box';
import {useIntl} from 'react-intl';
import Link from 'next/link';

const SignupFirebase = () => {
  const [timezones, setTimezones] = useState([]);
  const [timezonesLoading, setTimezonesLoading] = useState(false);
  const [countries, setCountries] = useState([]);
  const [countriesLoading, setCountriesLoading] = useState(false);
  const [states, setStates] = useState([]);
  const [statesLoading, setStatesLoading] = useState(false);
  const [showTermsError, setShowTermsError] = useState(false);
  const [identificationProof, setIdentificationProof] = useState({});

  const profileUrl = useRef('');
  const {messages} = useIntl();
  const dispatch = useDispatch();
  const {signInUser} = useAuthMethod();

  const validationSchema = CustomerConfigs(
    messages['validation.invalidPhone'],
    messages['validation.invalidWhatsapp'],
    messages['validation.passwordMisMatch'],
    false,
    true,
  ).signUpValidation;

  const customValidation = async (values, actions, activeStep) => {
    if (activeStep == 1) {
      return await stepOneValidation(values, actions);
    }
    if (activeStep == 2) {
      return await stepTwoValidation(values, actions);
    }
    return true;
  };

  const onSave = async (values, actions) => {
    if (values.accept_terms) {
      const userFormData = helpers.getFormData(values);
      dispatch(onSignUpCustomer(userFormData, values, signInUser));
      actions.setTouched({});
    } else {
      setShowTermsError(true);
    }
  };
  const onStepOneSuccess = (res, actions) => {
    if (!res.data.result) {
      if (res.data.message == 2) {
        actions.setErrors({
          phone: <IntlMessages id='validation.notUniquePhone' />,
        });
      } else if (res.data.message == 1) {
        actions.setErrors({
          whatsapp: <IntlMessages id='validation.notUniqueWhatsapp' />,
        });
      } else {
        actions.setErrors({
          whatsapp: <IntlMessages id='validation.notUniqueWhatsapp' />,
          phone: <IntlMessages id='validation.notUniquePhone' />,
        });
      }
    }
  };
  const onStepOneFail = (actions) => {
    actions.setErrors({
      whatsapp: <IntlMessages id='validation.notUniqueWhatsapp' />,
      phone: <IntlMessages id='validation.notUniquePhone' />,
    });
  };
  const stepOneValidation = async (values, actions) => {
    const params = {
      whatsapp: values.whatsapp,
      phone: values.phone,
    };
    if (values.whatsapp && values.phone) {
      return availableChecking(
        'customer/valid_credential',
        params,
        actions,
        onStepOneSuccess,
        onStepOneFail,
      );
    }
    return true;
  };
  const onStepTwoSuccess = (res, actions) => {
    if (!res.data.result) {
      if (res.data.message == 1) {
        actions.setErrors({
          email: <IntlMessages id='validation.notUniqueEmail' />,
        });
      } else if (res.data.message == 2) {
        actions.setErrors({
          username: <IntlMessages id='validation.notUniqueUsername' />,
        });
      } else {
        actions.setErrors({
          username: <IntlMessages id='validation.notUniqueUsername' />,
          email: <IntlMessages id='validation.notUniqueEmail' />,
        });
      }
    }
  };
  const onStepTwoFail = (actions) => {
    actions.setErrors({
      username: <IntlMessages id='validation.notUniqueUsername' />,
      email: <IntlMessages id='validation.notUniqueEmail' />,
    });
  };

  const stepTwoValidation = async (values, actions) => {
    const params = {
      username: values.username,
      email: values.email,
    };
    if (!values.accept_terms) {
      setShowTermsError(true);
    }
    if (values.username && values.email) {
      return availableChecking(
        'loginables/valid_credential',
        params,
        actions,
        onStepTwoSuccess,
        onStepTwoFail,
      );
    }
    return true;
  };

  useEffect(() => {
    getData(`/timezones/auto_complete`, {}, setTimezonesLoading, setTimezones);
    getData(`/countries/auto_complete`, {}, setCountriesLoading, setCountries);
    getData(`/states/auto_complete`, {}, setStatesLoading, setStates);
  }, []);

  const searchTimezones = (content) => {
    getData(
      `/timezones/auto_complete`,
      content,
      setTimezonesLoading,
      setTimezones,
    );
  };

  const searchCountries = (content) => {
    getData(
      `/countries/auto_complete`,
      content,
      setCountriesLoading,
      setCountries,
    );
  };

  const searchStates = (content) => {
    getData(`/states/auto_complete`, content, setStatesLoading, setStates);
  };

  const steps = [
    {
      key: 1,
      icon: <PersonIcon />,
      label: <IntlMessages id='common.customerInfo' />,
      children: (
        <CustomerStepOne
          profileUrl={profileUrl}
          countries={countries}
          countriesLoading={countriesLoading}
          searchCountries={searchCountries}
          states={states}
          statesLoading={statesLoading}
          searchStates={searchStates}
          identificationProof={identificationProof}
          setIdentificationProof={setIdentificationProof}
        />
      ),
    },
    {
      key: 2,
      icon: <AccountCircleIcon />,
      label: <IntlMessages id='common.accountInfo' />,
      children: (
        <SignupStepTwo
          timezones={timezones}
          timezonesLoading={timezonesLoading}
          searchTimezones={searchTimezones}
          showTermsError={showTermsError}
          setShowTermsError={setShowTermsError}
        />
      ),
    },
  ];
  const initialValues = {
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
    accept_terms: false,
    address_line_1: '',
    address_line_2: '',
    company: '',
    country_id: '',
    state_id: '',
    city: '',
    zip_code: '',
    is_business: 0,
    identification_proof: '',
  };
  return (
    <Box sx={{flex: 1, display: 'flex', flexDirection: 'column'}}>
      <Box sx={{flex: 1, display: 'flex', flexDirection: 'column', mb: 5}}>
        <SignupStepperModal
          steps={steps}
          onSave={onSave}
          validationSchema={validationSchema}
          initialValues={initialValues}
          customValidation={customValidation}
        />
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
