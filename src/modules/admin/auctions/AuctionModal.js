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
import ExtraDataOnStepTwo from './ExtraDataOnStepTwo';

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

  const [vehicle, setVehicle] = useState('');
  const [auctionItem, setAuctionItem] = useState({});
  const [auctionItemModal, setAuctionItemModal] = useState(false);

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
              if (Object.keys(initialValues).includes(key)) {
                if (key == 'items') {
                  let items = [];
                  value.forEach((item) => {
                    let data = {
                      id: item.id,
                      vin: item.vin,
                      lot_number: item.lot_number,
                      minimum_bid: item.pivot.minimum_bid,
                      buy_now_price: item.pivot.buy_now_price,
                      images: item.images,
                    };
                    items.push(data);
                  });
                  values.items = items;
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
      key: 2,
      icon: <DirectionsCarIcon />,
      label: <IntlMessages id='auction.auctionItems' />,
      children: (
        <AuctionStepTwo
          vehicles={vehicles}
          vehiclesLoading={vehiclesLoading}
          searchVehicles={searchVehicles}
          setVehiclesValidationError={setVehiclesValidationError}
          vehiclesValidationError={vehiclesValidationError}
          setVehicle={setVehicle}
          vehicle={vehicle}
          setAuctionItem={setAuctionItem}
          auctionItem={auctionItem}
          setAuctionItemModal={setAuctionItemModal}
          auctionItemModal={auctionItemModal}
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
      extraDataOnStep={2}
      extraData={
        <ExtraDataOnStepTwo
          vehicles={vehicles}
          vehiclesLoading={vehiclesLoading}
          searchVehicles={searchVehicles}
          setVehiclesValidationError={setVehiclesValidationError}
          vehiclesValidationError={vehiclesValidationError}
          setVehicle={setVehicle}
          vehicle={vehicle}
          setAuctionItem={setAuctionItem}
          auctionItem={auctionItem}
          setAuctionItemModal={setAuctionItemModal}
          auctionItemModal={auctionItemModal}
        />
      }
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
