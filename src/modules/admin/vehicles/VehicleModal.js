import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import CollectionsIcon from '@mui/icons-material/Collections';
import VehicleConfigs from '../../../configs/pages/vehicles';
import VehicleStepOne from './VehicleStepOne';
import VehicleStepTwo from './VehicleStepTwo';
import CustomModal from '../../CustomModal';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import {useEffect} from 'react';

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
    children: <VehicleStepTwo />,
  },
  {
    key: 3,
    icon: <CollectionsIcon />,
    label: 'Vehicle Images',
    children: <Box>Third Steps</Box>,
  },
];

const validationSchema = VehicleConfigs().validationSchema;

export default function VehicleModal({open, toggleOpen, width, ...rest}) {
  const onSave = (values) => {
    console.log('fff', values);
  };
  useEffect(() => {}, []);
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
