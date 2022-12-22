import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import {onInsertRole, onUpdateRole} from 'redux/actions';
import IntlMessages from '@crema/utility/IntlMessages';
import jwtAxios from '@crema/services/auth/jwt-auth';
import {getData, availableChecking} from 'configs';
import CustomModal from 'components/CustomModal';
import RoleConfigs from 'configs/pages/roles';
import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import RoleStepOne from './RoleStepOne';
import PropTypes from 'prop-types';

export default function RoleModal({
  open,
  toggleOpen,
  width,
  recordId,
  edit,
  ...rest
}) {
  const [totalPermissions, setTotalPermissions] = useState(0);
  const [role, setRole] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [permissions, setPermissions] = useState([]);
  const [permissionsLoading, setPermissionsLoading] = useState(false);
  const [initialValues, setInitialValues] = useState({
    name: '',
    type: '',
    permissions: [],
  });
  const dispatch = useDispatch();
  const validationSchema = RoleConfigs().validationSchema;

  const onStepOneSuccess = (res, actions) => {
    if (!res.data.result) {
      actions.setErrors({
        name: <IntlMessages id='validation.notUniquName' />,
      });
    }
  };

  const onStepOneFail = (actions) => {
    actions.setErrors({
      name: <IntlMessages id='validation.notUniquName' />,
    });
  };

  const stepOneValidation = async (values, actions) => {
    const params = {
      name: values.name,
      id: role ? role.id : null,
    };
    if (values.name) {
      return availableChecking(
        'role/valid_credential',
        params,
        actions,
        onStepOneSuccess,
        onStepOneFail,
      );
    }
    return true;
  };

  const customValidation = async (values, actions, activeStep) => {
    if (activeStep == 1) {
      return await stepOneValidation(values, actions);
    }
    return true;
  };

  useEffect(() => {
    getData(
      `/grouped_permissions`,
      {},
      setPermissionsLoading,
      setPermissions,
      (data) => setTotalPermissions(data.total),
    );
  }, []);

  useEffect(() => {
    if (recordId) {
      (async function () {
        try {
          setIsLoading(true);
          const res = await jwtAxios.get(`/roles/${recordId}`);
          if (res.status === 200 && res.data.result) {
            setRole(res.data.data);
            let values = {};
            Object.entries(res.data.data).forEach(([key, value]) => {
              if (Object.keys(initialValues).includes(key)) {
                if (key == 'permissions') {
                  values.permissions = [];
                  value.forEach((item) => {
                    values.permissions.push(item.id);
                  });
                } else {
                  values[key] = value ? value : initialValues[key];
                }
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
    if (recordId) {
      dispatch(onUpdateRole(recordId, values, toggleOpen));
    } else {
      dispatch(onInsertRole(values, toggleOpen));
    }
  };

  return (
    <CustomModal
      open={open}
      toggleOpen={toggleOpen}
      width={width}
      onSave={onSave}
      validationSchema={validationSchema}
      initialValues={initialValues}
      isLoading={isLoading}
      customValidation={customValidation}
      title={<IntlMessages id='role.roleInfo' />}
      height={480}
      {...rest}
    >
      <RoleStepOne
        permissions={permissions}
        permissionsLoading={permissionsLoading}
        totalPermissions={totalPermissions}
      />
    </CustomModal>
  );
}
RoleModal.propTypes = {
  open: PropTypes.bool.isRequired,
  toggleOpen: PropTypes.func,
  width: PropTypes.number,
  recordId: PropTypes.number,
  edit: PropTypes.bool,
};
