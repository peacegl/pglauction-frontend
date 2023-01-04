import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {onInsertCustomer, onUpdateCustomer} from 'redux/actions';
import IntlMessages from '@crema/utility/IntlMessages';
import CustomerConfigs from 'configs/pages/customers';
import jwtAxios from '@crema/services/auth/jwt-auth';
import {appIntl} from '@crema/utility/helper/Utils';
import PersonIcon from '@mui/icons-material/Person';
import CustomerStepThree from './CustomerStepThree';
import {getData, availableChecking} from 'configs';
import {useEffect, useState, useRef} from 'react';
import CustomModal from 'components/CustomModal';
import CustomerStepOne from './CustomerStepOne';
import CustomerStepTwo from './CustomerStepTwo';
import {useDispatch} from 'react-redux';
import PropTypes from 'prop-types';
import Helper from 'helpers/helpers';

export default function CustomerModal({
  open,
  toggleOpen,
  width,
  recordId,
  edit,
  ...rest
}) {
  const profileUrl = useRef();
  const [customer, setCustomer] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [timezones, setTimezones] = useState([]);
  const [timezonesLoading, setTimezonesLoading] = useState(false);
  const [countries, setCountries] = useState([]);
  const [countriesLoading, setCountriesLoading] = useState(false);
  const [states, setStates] = useState([]);
  const [statesLoading, setStatesLoading] = useState(false);
  const [initialValues, setInitialValues] = useState({
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
    accept_terms: true,
    address_line_1: '',
    address_line_2: '',
    company: '',
    country_id: '',
    state_id: '',
    city: '',
    zip_code: '',
    status: '',
  });
  const {messages} = appIntl('');
  const dispatch = useDispatch();

  const validationSchema = CustomerConfigs(
    messages['validation.invalidPhone'],
    messages['validation.invalidWhatsapp'],
    messages['validation.passwordMisMatch'],
    edit,
  ).validationSchema;

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
      id: recordId ? recordId : null,
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
      id: customer?.login?.id ? customer?.login?.id : null,
    };
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
  const customValidation = async (values, actions, activeStep) => {
    if (activeStep == 1) {
      return await stepOneValidation(values, actions);
    }
    if (activeStep == 2) {
      return await stepTwoValidation(values, actions);
    }
    return true;
  };

  useEffect(() => {
    if (!recordId) {
      getData(
        `/timezones/auto_complete`,
        {},
        setTimezonesLoading,
        setTimezones,
      );
      getData(
        `/countries/auto_complete`,
        {},
        setCountriesLoading,
        setCountries,
      );
      getData(`/states/auto_complete`, {}, setStatesLoading, setStates);
    }
  }, []);

  const searchTimezones = (content, name = null) => {
    getData(
      `/timezones/auto_complete${name ? '?name=' + name : ''}`,
      content,
      setTimezonesLoading,
      setTimezones,
    );
  };

  const searchCountries = (content, country_id = null) => {
    getData(
      `/countries/auto_complete${country_id ? '?id=' + country_id : ''}`,
      content,
      setCountriesLoading,
      setCountries,
    );
  };

  const searchStates = (content, state_id = null) => {
    getData(
      `/states/auto_complete${state_id ? '?id=' + state_id : ''}`,
      content,
      setStatesLoading,
      setStates,
    );
  };
  useEffect(() => {
    if (recordId) {
      (async function () {
        try {
          setIsLoading(true);
          const res = await jwtAxios.get(`/customers/${recordId}`);
          if (res.status === 200 && res.data.result) {
            setCustomer(res.data.data);
            let values = {};
            Object.entries(res.data.data).forEach(([key, value]) => {
              if (Object.keys(initialValues).includes(key)) {
                if (key == 'profile') {
                  profileUrl.current = value;
                } else {
                  values[key] = value ? value : initialValues[key];
                }
              }
              if (typeof value === 'object' && value != null) {
                Object.entries(value).forEach(([ikey, ivalue]) => {
                  if (Object.keys(initialValues).includes(ikey)) {
                    values[ikey] = ivalue;
                  }
                });
              }
            });
            setInitialValues(values);
            searchTimezones({}, values.timezone);
            searchCountries({state_id: values.state_id}, values.country_id);
            searchStates({country_id: values.country_id}, values.state_id);
          }
          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);
        }
      })();
    }
  }, [recordId]);

  const onSave = (values) => {
    values.loginableId = customer?.login?.id;
    const userFormData = Helper.getFormData(values);
    if (recordId) {
      dispatch(onUpdateCustomer(recordId, userFormData, toggleOpen));
    } else {
      dispatch(onInsertCustomer(userFormData, toggleOpen));
    }
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
        />
      ),
    },
    {
      key: 2,
      icon: <AccountCircleIcon />,
      label: <IntlMessages id='common.accountInfo' />,
      children: (
        <CustomerStepTwo
          edit={edit}
          customer={customer}
          timezones={timezones}
          timezonesLoading={timezonesLoading}
          searchTimezones={searchTimezones}
        />
      ),
    },
  ];
  return (
    <CustomModal
      open={open}
      toggleOpen={toggleOpen}
      width={width}
      steps={steps}
      onSave={onSave}
      height={500}
      validationSchema={validationSchema}
      initialValues={initialValues}
      isLoading={isLoading}
      customValidation={customValidation}
      {...rest}
    />
  );
}
CustomerModal.propTypes = {
  open: PropTypes.bool.isRequired,
  toggleOpen: PropTypes.func,
  width: PropTypes.number,
  recordId: PropTypes.string,
  edit: PropTypes.bool,
};
