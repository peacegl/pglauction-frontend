import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import {onInsertAuction, onUpdateAuction} from 'redux/actions';
import IntlMessages from '@crema/utility/IntlMessages';
import jwtAxios from '@crema/services/auth/jwt-auth';
import AuctionConfigs from 'configs/pages/auctions';
import StoreIcon from '@mui/icons-material/Store';
import CustomModal from 'components/CustomModal';
import AuctionStepTwo from './AuctionStepTwo';
import AuctionStepOne from './AuctionStepOne';
import {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import PropTypes from 'prop-types';
import {getData} from 'configs';

export default function AuctionModal({
  open,
  toggleOpen,
  width,
  recordId,
  edit,
  ...rest
}) {
  const [vehiclesValidationError, setVehiclesValidationError] = useState(false);
  const [vehiclesLoading, setVehiclesLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [vehicles, setVehicles] = useState([]);
  const dispatch = useDispatch();
  const [initialValues, setInitialValues] = useState({
    name: '',
    start_date: '',
    end_date: '',
    status: '',
    items: [],
  });
  const validationSchema = AuctionConfigs().validationSchema;
  const searchVehicles = (content, vehicle_id = null) => {
    getData(
      `/vehicleColumn/auto_complete?column[]=vin&column[]=lot_number&mainImage=1&status=!sold${
        vehicle_id ? '&id=' + vehicle_id : ''
      }`,
      content,
      setVehiclesLoading,
      setVehicles,
    );
  };
  useEffect(() => {
    searchVehicles({});
  }, []);

  useEffect(() => {
    if (recordId) {
      (async function () {
        try {
          setIsLoading(true);
          const res = await jwtAxios.get(`/auctions/${recordId}`);
          if (res.status === 200 && res.data.result) {
            let values = {};
            Object.entries(res.data.data).forEach(([key, value]) => {
              if (insertColumns.includes(key)) {
                values[key] = value ? value : initialValues[key];
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

  const stepTwoValidation = async (values, actions) => {
    if (values.items.length == 0) {
      setVehiclesValidationError(true);
      return false;
    }
    return true;
  };

  const customValidation = async (values, actions, activeStep) => {
    if (activeStep == 2) {
      return stepTwoValidation(values, actions);
    }
    return true;
  };

  const onSave = (values) => {
    if (recordId) {
      dispatch(onUpdateAuction(recordId, values, toggleOpen));
    } else {
      dispatch(onInsertAuction(values, toggleOpen));
    }
  };
  const steps = [
    {
      key: 1,
      icon: <StoreIcon />,
      label: <IntlMessages id='auction.auctionInfo' />,
      children: <AuctionStepOne />,
    },
    {
      key: 3,
      icon: <DirectionsCarIcon />,
      label: <IntlMessages id='auction.auctionItems' />,
      children: (
        <AuctionStepTwo
          vehicles={vehicles}
          vehiclesLoading={vehiclesLoading}
          searchVehicles={searchVehicles}
          setVehiclesValidationError={setVehiclesValidationError}
          vehiclesValidationError={vehiclesValidationError}
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
AuctionModal.propTypes = {
  open: PropTypes.bool.isRequired,
  toggleOpen: PropTypes.func,
  width: PropTypes.number,
  recordId: PropTypes.string,
  edit: PropTypes.bool,
};
