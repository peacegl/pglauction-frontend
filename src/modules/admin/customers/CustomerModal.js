import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {onInsertCustomer, onUpdateCustomer} from 'redux/actions';
import CustomerConfigs from '../../../configs/pages/customers';
import CustomModal from '../../../components/CustomModal';
import IntlMessages from '@crema/utility/IntlMessages';
import jwtAxios from '@crema/services/auth/jwt-auth';
import {appIntl} from '@crema/utility/helper/Utils';
import PersonIcon from '@mui/icons-material/Person';
import CustomerStepThree from './CustomerStepThree';
import {useEffect, useState, useRef} from 'react';
import CustomerStepOne from './CustomerStepOne';
import CustomerStepTwo from './CustomerStepTwo';
import {useDispatch} from 'react-redux';
import PropTypes from 'prop-types';
import Helper from 'helpers/helpers';
import {getData} from '../../../configs';

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
  const [initialValues, setInitialValues] = useState({
    profile: '',
    fullname: '',
    phone: '',
    whatsapp: '',
    gender: '',
    email: '',
    username: '',
    password: '',
    timezone: '',
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

  const availableChecking = async (url, params, actions, onSuccess, onFail) => {
    try {
      const res = await jwtAxios.get(url, {
        params: params,
      });
      if (res.status === 200) {
        onSuccess(res, actions);
        return res.data.result;
      }
      onFail(actions);
      return false;
    } catch (error) {
      onFail(actions);
      return false;
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
      id: customer?.login?.id ? customer?.id : null,
    };
    return availableChecking(
      'customer/valid_credential',
      params,
      actions,
      onStepOneSuccess,
      onStepOneFail,
    );
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
    return availableChecking(
      'loginables/valid_credential',
      params,
      actions,
      onStepTwoSuccess,
      onStepTwoFail,
    );
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
    // getData('/role/auto_complete?type=customer', {}, setRolesLoading, setRoles);
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
          }
          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);
        }
      })();
    }
  }, [recordId]);

  const onSave = (values) => {
    console.log('dfdsf');
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
      children: <CustomerStepOne profileUrl={profileUrl} />,
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
