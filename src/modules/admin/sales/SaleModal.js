import {onSaleVehicle, onAddSale, onUpdateSale} from 'redux/actions';
import IntlMessages from '@crema/utility/IntlMessages';
import jwtAxios from '@crema/services/auth/jwt-auth';
import CustomModal from 'components/CustomModal';
import SaleConfigs from 'configs/pages/sales';
import {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import PropTypes from 'prop-types';
import SaleForm from './SaleForm';
import {getData} from 'configs';

export default function SellModal({
  open,
  toggleOpen,
  width,
  selectedItem,
  recordId,
  showVehicle = false,
  ...rest
}) {
  const [customersLoading, setCustomersLoading] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [vehiclesLoading, setVehiclesLoading] = useState(false);
  const [vehicles, setVehicles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [initialValues, setInitialValues] = useState({
    vehicle_id: '',
    buyer_id: '',
    sale_price: '',
    sale_date: '',
    description: '',
    currency: 'AED',
    status: '',
  });
  const validationSchema = showVehicle
    ? SaleConfigs().validationSchemaWithVehicle
    : SaleConfigs().validationSchema;

  const searchVehicles = (content, vehicle_id = null) => {
    getData(
      `/vehicleColumn/auto_complete?column[]=vin&column[]=lot_number&status=!sold${
        vehicle_id ? '&id=' + vehicle_id : ''
      }`,
      content,
      setVehiclesLoading,
      setVehicles,
    );
  };

  const searchCustomers = (content, customer_id = null) => {
    getData(
      `/customer/auto_complete${customer_id ? '?id=' + customer_id : ''}`,
      content,
      setCustomersLoading,
      setCustomers,
    );
  };

  useEffect(() => {
    if (!recordId) {
      searchCustomers({});
      showVehicle && searchVehicles({});
    }
  }, []);

  useEffect(() => {
    if (recordId) {
      (async function () {
        try {
          setIsLoading(true);
          const res = await jwtAxios.get(`/sales/${recordId}`);
          if (res.status === 200 && res.data.result) {
            let values = {};
            Object.entries(res.data.data).forEach(([key, value]) => {
              if (Object.keys(initialValues).includes(key)) {
                values[key] = value ? value : initialValues[key];
              }
            });
            setInitialValues(values);
            searchCustomers({}, values.buyer_id);
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
    if (!showVehicle) {
      values.vehicle_id = selectedItem.id;
    }
    if (recordId) {
      dispatch(onUpdateSale(recordId, values, toggleOpen));
    } else {
      delete values.status;
      if (showVehicle) dispatch(onAddSale(values, toggleOpen));
      else dispatch(onSaleVehicle(values, toggleOpen));
    }
  };

  return (
    <CustomModal
      open={open}
      toggleOpen={toggleOpen}
      width={width}
      onSave={onSave}
      title={<IntlMessages id='sale.saleData' />}
      validationSchema={validationSchema}
      isLoading={isLoading}
      initialValues={initialValues}
      {...rest}
    >
      <SaleForm
        customers={customers}
        customersLoading={customersLoading}
        searchCustomers={searchCustomers}
        showVehicle={showVehicle}
        vehicles={vehicles}
        vehiclesLoading={vehiclesLoading}
        searchVehicles={searchVehicles}
        recordId={recordId}
      />
    </CustomModal>
  );
}
SellModal.propTypes = {
  open: PropTypes.bool.isRequired,
  toggleOpen: PropTypes.func,
  width: PropTypes.number,
  showVehicle: PropTypes.bool,
  selectedItem: PropTypes.array,
  recordId: PropTypes.any,
};
