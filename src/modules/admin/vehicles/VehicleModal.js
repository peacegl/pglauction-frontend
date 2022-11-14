import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import ShoppingBag from '@mui/icons-material/ShoppingBag';
import SellIcon from '@mui/icons-material/Sell';
import CollectionsIcon from '@mui/icons-material/Collections';
import VehicleConfigs from '../../../configs/pages/vehicles';
import jwtAxios from '@crema/services/auth/jwt-auth';
import {onInsertVehicle, onUpdateVehicle} from 'redux/actions';
import VehicleStepOne from './VehicleStepOne';
import AuctionStep from '../../../components/auctions/AuctionStep';
import CustomModal from '../../CustomModal';
import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import PropTypes from 'prop-types';
import IntlMessages from '@crema/utility/IntlMessages';

const validationSchema = VehicleConfigs().validationSchema;

export default function VehicleModal({
  open,
  toggleOpen,
  width,
  recordId,
  edit,
  ...rest
}) {
  const [locationLoading, setLocationLoading] = useState(false);
  const [categoryLoading, setCategoryLoading] = useState(false);
  const [sellersLoading, setSellersLoading] = useState(false);
  const [locations, setLocations] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [initialValues, setInitialValues] = useState({
    vin: '',
    lot_number: '',
    year: '',
    model: '',
    color: '',
    engine_type: '',
    cylinders: '',
    vehicle_type: '',
    seller_id: '',
    location_id: '',
    category_id: '',
    title: '',
    subtitle: '',
    start_date: '',
    end_date: '',
    minimum_bid: '',
    buy_now_price: '',
    description: '',
    youtube_url: '',
    note: '',
  });
  const dispatch = useDispatch();
  const fetchData = async (url, content, loading, setData) => {
    try {
      loading(true);
      const res = await jwtAxios.get(url, {params: content});
      if (res.status === 200 && res.data.result) {
        setData(res.data.data);
      } else {
        setData([]);
      }
      loading(false);
    } catch (error) {
      setData([]);
      loading(false);
    }
  };
  const searchLocations = (content, location_id = null) => {
    fetchData(
      `/location/auto_complete${location_id ? '?id=' + location_id : ''}`,
      content,
      setLocationLoading,
      setLocations,
    );
  };
  const searchCategories = (content, category_id = null) => {
    fetchData(
      `/category/auto_complete${category_id ? '?id=' + category_id : ''}`,
      content,
      setCategoryLoading,
      setCategories,
    );
  };
  const searchSellers = (content, seller_id = null) => {
    fetchData(
      `/sellers/auto_complete${seller_id ? '?id=' + seller_id : ''}`,
      content,
      setSellersLoading,
      setSellers,
    );
  };

  useEffect(() => {
    if (!recordId) {
      searchLocations({});
      searchCategories({});
      searchSellers({});
    }
  }, []);

  useEffect(() => {
    if (recordId) {
      (async function () {
        try {
          setIsLoading(true);
          const res = await jwtAxios.get(`/vehicles/${recordId}`);
          if (res.status === 200 && res.data.result) {
            let values = {};
            Object.entries(res.data.data).forEach(([key, value]) => {
              if (Object.keys(initialValues).includes(key)) {
                values[key] = value;
              }
              if (typeof value === 'object' && value != null)
                Object.entries(value).forEach(([ikey, ivalue]) => {
                  if (Object.keys(initialValues).includes(ikey)) {
                    values[ikey] = ivalue;
                  }
                });
            });
            setInitialValues(values);
            searchLocations({}, values.location_id);
            searchCategories({}, values.category_id);
            searchSellers({}, values.seller_id);
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
      dispatch(onUpdateVehicle(recordId, values, toggleOpen));
    } else {
      dispatch(onInsertVehicle(values, toggleOpen));
    }
  };
  const steps = [
    {
      key: 1,
      icon: <DirectionsCarIcon />,
      label: <IntlMessages id='vehicle.vehicleProperties' />,
      children: <VehicleStepOne />,
    },
    {
      key: 2,
      icon: <SellIcon />,
      label: <IntlMessages id='auction.auctionDetails' />,
      children: (
        <AuctionStep
          locations={locations}
          locationLoading={locationLoading}
          categories={categories}
          categoryLoading={categoryLoading}
          sellersLoading={sellersLoading}
          sellers={sellers}
          searchCategories={searchCategories}
          searchLocations={searchLocations}
          searchSellers={searchSellers}
          setIsLoading={setIsLoading}
        />
      ),
    },
    // {
    //   key: 3,
    //   icon: <CollectionsIcon />,
    //   label: 'Vehicle Images',
    //   children: <Box>Third Steps</Box>,
    // },
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
      {...rest}
    />
  );
}
VehicleModal.propTypes = {
  open: PropTypes.bool.isRequired,
  toggleOpen: PropTypes.func,
  width: PropTypes.number,
  recordId: PropTypes.string,
  edit: PropTypes.bool,
};
