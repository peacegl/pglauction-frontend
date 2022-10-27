import CustomModal from '../../CustomModal';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';

const steps = [
  {
    key: 1,
    icon: <AddCircleIcon />,
    label: 'Vehicle Properties',
    children: <Box>First Step</Box>,
  },
  {
    key: 2,
    icon: <AddCircleIcon />,
    label: 'Vehicle Info',
    children: <Box>Second Step</Box>,
  },
  {
    key: 1,
    icon: <AddCircleIcon />,
    label: 'Auction Properties',
    children: <Box>Third Step</Box>,
  },
];

export default function VehicleModal({open, toggleOpen, width, ...rest}) {
  return (
    <CustomModal
      open={open}
      toggleOpen={toggleOpen}
      width={width}
      {...rest}
      steps={steps}
    />
  );
}
VehicleModal.propTypes = {
  open: PropTypes.bool.isRequired,
  toggleOpen: PropTypes.func,
  width: PropTypes.number,
};
