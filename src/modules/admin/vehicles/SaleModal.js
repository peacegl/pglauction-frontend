import CustomModal from '../../../components/CustomModal';
import IntlMessages from '@crema/utility/IntlMessages';
import SaleConfigs from '../../../configs/pages/sales';
import {onSaleVehicle} from 'redux/actions';
import {useState, useEffect} from 'react';
import {getData} from '../../../configs';
import {useDispatch} from 'react-redux';
import PropTypes from 'prop-types';
import SaleForm from './SaleForm';

const validationSchema = SaleConfigs().validationSchema;
export default function SellModal({
  open,
  toggleOpen,
  width,
  selectedItem,
  ...rest
}) {
  const [customersLoading, setCustomersLoading] = useState(false);
  const [customers, setCustomers] = useState([]);

  const searchCustomers = (content) => {
    getData(
      `/customer/auto_complete`,
      content,
      setCustomersLoading,
      setCustomers,
    );
  };

  useEffect(() => {
    getData(`/customer/auto_complete`, {}, setCustomersLoading, setCustomers);
  }, []);
  const dispatch = useDispatch();

  const onSave = (values) => {
    values.vehicle_id = selectedItem.id;
    dispatch(onSaleVehicle(values, toggleOpen));
  };
  return (
    <CustomModal
      open={open}
      toggleOpen={toggleOpen}
      width={width}
      onSave={onSave}
      title={<IntlMessages id='sale.saleData' />}
      validationSchema={validationSchema}
      initialValues={{
        buyer_id: '',
        sale_price: '',
        sale_date: '',
        description: '',
      }}
      {...rest}
    >
      <SaleForm
        customers={customers}
        customersLoading={customersLoading}
        searchCustomers={searchCustomers}
      />
    </CustomModal>
  );
}
SellModal.propTypes = {
  open: PropTypes.bool.isRequired,
  toggleOpen: PropTypes.func,
  width: PropTypes.number,
  selectedItem: PropTypes.array.isRequired,
};
