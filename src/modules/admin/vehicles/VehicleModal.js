import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import CollectionsIcon from '@mui/icons-material/Collections';
import VehicleConfigs from '../../../configs/pages/vehicles';
import jwtAxios from '@crema/services/auth/jwt-auth';
import {onInsertVehicle} from 'redux/actions';
import VehicleStepOne from './VehicleStepOne';
import VehicleStepTwo from './VehicleStepTwo';
import CustomModal from '../../CustomModal';
import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';

const validationSchema = VehicleConfigs().validationSchema;

export default function VehicleModal({open, toggleOpen, width, ...rest}) {
  const [locationLoading, setLocationLoading] = useState(false);
  const [categoryLoading, setCategoryLoading] = useState(false);
  const [locations, setLocations] = useState([]);
  const [categories, setCategories] = useState([]);

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
  const searchLocations = (content) => {
    fetchData(
      `/location/auto_complete`,
      content,
      setLocationLoading,
      setLocations,
    );
  };
  const searchCategories = (content) => {
    fetchData(
      `/category/auto_complete`,
      content,
      setCategoryLoading,
      setCategories,
    );
  };

  useEffect(() => {
    fetchData(`/location/auto_complete`, {}, setLocationLoading, setLocations);
    fetchData(`/category/auto_complete`, {}, setCategoryLoading, setCategories);
  }, []);

  const onSave = (values) => {
    dispatch(onInsertVehicle(values));
  };
  const steps = [
    {
      key: 1,
      icon: <DirectionsCarIcon />,
      label: 'Vehicle Properties',
      children: <VehicleStepOne />,
    },
    {
      key: 2,
      icon: <ShoppingBagIcon />,
      label: 'Auction Details',
      children: (
        <VehicleStepTwo
          locations={locations}
          locationLoading={locationLoading}
          categories={categories}
          categoryLoading={categoryLoading}
          searchCategories={searchCategories}
          searchLocations={searchLocations}
        />
      ),
    },
    {
      key: 3,
      icon: <CollectionsIcon />,
      label: 'Vehicle Images',
      children: <Box>Third Steps</Box>,
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
      initialValues={{
        vin: '',
        lot_number: '',
        year: '',
        model: '',
        color: '',
        engine_type: '',
        cylinders: '',
        vehicle_type: '',
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
      }}
      {...rest}
    />
  );
}
VehicleModal.propTypes = {
  open: PropTypes.bool.isRequired,
  toggleOpen: PropTypes.func,
  width: PropTypes.number,
};
