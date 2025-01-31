import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {onInsertUser, onUpdateUser} from 'redux/actions';
import IntlMessages from '@crema/utility/IntlMessages';
import jwtAxios from '@crema/services/auth/jwt-auth';
import {appIntl} from '@crema/utility/helper/Utils';
import PersonIcon from '@mui/icons-material/Person';
import {getData, availableChecking} from 'configs';
import {useEffect, useState, useRef} from 'react';
import CustomModal from 'components/CustomModal';
import UserConfigs from 'configs/pages/users';
import UserStepThree from './UserStepThree';
import {useDispatch} from 'react-redux';
import UserStepOne from './UserStepOne';
import UserStepTwo from './UserStepTwo';
import Helper from 'helpers/helpers';
import PropTypes from 'prop-types';

export default function UserModal({
  open,
  toggleOpen,
  width,
  recordId,
  edit,
  ...rest
}) {
  const profileUrl = useRef();
  const [totalPermissions, setTotalPermissions] = useState(0);
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [roles, setRoles] = useState([]);
  const [rolesLoading, setRolesLoading] = useState(false);
  const [permissions, setPermissions] = useState([]);
  const [timezones, setTimezones] = useState([]);
  const [timezonesLoading, setTimezonesLoading] = useState(false);
  const [permissionsLoading, setPermissionsLoading] = useState(false);
  const [initialValues, setInitialValues] = useState({
    profile: '',
    fullname: '',
    phone: '',
    whatsapp: '',
    gender: '',
    birth_date: '',
    email: '',
    username: '',
    password: '',
    timezone: '',
    status: '',
    type: '',
    roles: [],
    permissions: [],
  });
  const {messages} = appIntl('');
  const dispatch = useDispatch();

  const validationSchema = UserConfigs(
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
    if (values.whatsapp || values.phone) {
      return availableChecking(
        'user/valid_credential',
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
      id: user?.login?.id ? user?.login?.id : null,
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
    } else if (activeStep == 2) {
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
    }
    getData(`/role/auto_complete?type=user`, {}, setRolesLoading, setRoles);
    getData(
      `/grouped_permissions`,
      {},
      setPermissionsLoading,
      setPermissions,
      (data) => setTotalPermissions(data.total),
    );
  }, []);

  const searchTimezones = (content, name = null) => {
    getData(
      `/timezones/auto_complete${name ? '?name=' + name : ''}`,
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
          const res = await jwtAxios.get(`/users/${recordId}`);
          if (res.status === 200 && res.data.result) {
            setUser(res.data.data);
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
                  if (ikey == 'permissions') {
                    values.permissions = [];
                    ivalue.forEach((item) => {
                      values.permissions.push(item.id);
                    });
                  }
                  if (ikey == 'roles') {
                    values.roles = [];
                    ivalue.forEach((item) => {
                      values.roles.push(item.id);
                    });
                  }
                });
              }
            });
            setInitialValues(values);
            searchTimezones({}, values.timezone);
          }
          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);
        }
      })();
    }
  }, [recordId]);

  const onSave = (values) => {
    values.loginableId = user?.login?.id;
    const userFormData = Helper.getFormData(values);
    if (recordId) {
      dispatch(onUpdateUser(recordId, userFormData, toggleOpen));
    } else {
      dispatch(onInsertUser(userFormData, toggleOpen));
    }
  };
  const steps = [
    {
      key: 1,
      icon: <PersonIcon />,
      label: <IntlMessages id='common.userInfo' />,
      children: <UserStepOne profileUrl={profileUrl} />,
    },
    {
      key: 2,
      icon: <AccountCircleIcon />,
      label: <IntlMessages id='common.accountInfo' />,
      children: (
        <UserStepTwo
          edit={edit}
          user={user}
          timezones={timezones}
          timezonesLoading={timezonesLoading}
          searchTimezones={searchTimezones}
        />
      ),
    },
    {
      key: 3,
      icon: <ManageAccountsIcon />,
      label: <IntlMessages id='common.rolePermission' />,
      children: (
        <UserStepThree
          roles={roles}
          rolesLoading={rolesLoading}
          permissions={permissions}
          permissionsLoading={permissionsLoading}
          totalPermissions={totalPermissions}
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
UserModal.propTypes = {
  open: PropTypes.bool.isRequired,
  toggleOpen: PropTypes.func,
  width: PropTypes.number,
  recordId: PropTypes.string,
  edit: PropTypes.bool,
};
