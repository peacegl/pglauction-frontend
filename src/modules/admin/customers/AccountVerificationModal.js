import IntlMessages from '@crema/utility/IntlMessages';
import CustomerConfigs from 'configs/pages/customers';
import jwtAxios from '@crema/services/auth/jwt-auth';
import VerificationForm from './VerificationForm';
import CustomModal from 'components/CustomModal';
import {onVerifyCustomer} from 'redux/actions';
import {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import PropTypes from 'prop-types';

export default function AccountVerification({
  open,
  toggleOpen,
  width,
  recordId,
  ...rest
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [initialValues, setInitialValues] = useState({customer_status: ''});
  const validationSchema = CustomerConfigs().verifySchema;
  const [customerData, setCustomerData] = useState({});

  useEffect(() => {
    if (recordId) {
      (async function () {
        try {
          setIsLoading(true);
          const res = await jwtAxios.get(`/customers/${recordId}`);
          if (res.status === 200 && res.data.result) {
            setInitialValues({customer_status: res.data.data.customer_status});
            setCustomerData(res.data.data);
          }
          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);
        }
      })();
    }
  }, [recordId]);
  const dispatch = useDispatch();

  const onSave = (values) => {
    dispatch(onVerifyCustomer(recordId, values, toggleOpen));
  };

  return (
    <CustomModal
      open={open}
      toggleOpen={toggleOpen}
      width={width}
      onSave={onSave}
      title={<IntlMessages id='customer.verifyCustomer' />}
      validationSchema={validationSchema}
      isLoading={isLoading}
      initialValues={initialValues}
      {...rest}
    >
      <VerificationForm customerData={customerData} />
    </CustomModal>
  );
}
AccountVerification.propTypes = {
  open: PropTypes.bool.isRequired,
  toggleOpen: PropTypes.func,
  width: PropTypes.number,
  recordId: PropTypes.any,
};
