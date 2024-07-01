import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {onInsertCustomer, onUpdateCustomer} from 'redux/actions';
import IntlMessages from '@crema/utility/IntlMessages';
import configsOwnerConfigs from 'configs/pages/vehicle-owners';
import jwtAxios from '@crema/services/auth/jwt-auth';
import {appIntl} from '@crema/utility/helper/Utils';
import PersonIcon from '@mui/icons-material/Person';
import {getData} from 'configs';
import {useEffect, useState, useRef} from 'react';
import CustomModal from 'components/CustomModal';
import VehicleOwnerStepOne from './VehicleOwnerStepOne';
import {useDispatch} from 'react-redux';
import Helper from 'helpers/helpers';
import PropTypes from 'prop-types';
import {
  FETCH_ERROR,
  FETCH_SUCCESS,
  SHOW_MESSAGE,
} from 'shared/constants/ActionTypes';

export default function VehicleOwnerModel({
  open,
  toggleOpen,
  width,
  recordId,
  edit,
  tableRecords,
  setTableRecords,
  ...rest
}) {
  const [customer, setCustomer] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [initialValues, setInitialValues] = useState({
    name: '',
  });
  const {messages} = appIntl('');
  const dispatch = useDispatch();

  const validationSchema = configsOwnerConfigs(
    messages['validation.invalidPhone'],
  ).validationSchema;

  useEffect(() => {
    if (recordId) {
      const selectedRecord = tableRecords.find((item) => item.id == recordId);
      if (selectedRecord) {
        setInitialValues({name: selectedRecord.name});
      }
    }
  }, [recordId]);

  const onSave = async (values) => {
    values.loginableId = customer?.login?.id;
    if (recordId) {
      try {
        const {data} = await jwtAxios.put(`/owners/${recordId}`, values);
        if (toggleOpen) toggleOpen(false);
        dispatch({
          type: SHOW_MESSAGE,
          payload: 'Owner updated successfully',
        });
        setTableRecords((prev) => {
          return prev.map((item) => {
            if (item.id == recordId) {
              return data;
            }
            return item;
          });
        });
      } catch (error) {
        if (error?.request?.status == 422) {
          const res = JSON.parse(error.request.response);
          console.log('fff', res.errors);
          res.errors?.forEach((element) => {
            dispatch({type: FETCH_ERROR, payload: element.message});
          });
        } else {
          dispatch({
            type: FETCH_ERROR,
            payload: error,
          });
        }
      }
    } else {
      try {
        const {data} = await jwtAxios.post(`/owners`, values);
        if (toggleOpen) toggleOpen(false);
        dispatch({
          type: SHOW_MESSAGE,
          payload: 'Owner created successfully',
        });
        setTableRecords((prev) => {
          return [data, ...prev];
        });
      } catch (error) {
        if (error?.request?.status == 422) {
          const res = JSON.parse(error.request.response);
          console.log('fff', res.errors);
          res.errors?.forEach((element) => {
            dispatch({type: FETCH_ERROR, payload: element.message});
          });
        } else {
          dispatch({
            type: FETCH_ERROR,
            payload: error,
          });
        }
      }
    }
  };
  const steps = [
    {
      key: 1,
      icon: <PersonIcon />,
      label: <IntlMessages id='owner.vehicleOwnerInfo' />,
      children: <VehicleOwnerStepOne />,
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
      {...rest}
    />
  );
}
VehicleOwnerModel.propTypes = {
  open: PropTypes.bool.isRequired,
  toggleOpen: PropTypes.func,
  width: PropTypes.number,
  recordId: PropTypes.string,
  edit: PropTypes.bool,
  setTableRecords: PropTypes.func,
  tableRecords: PropTypes.array,
};
