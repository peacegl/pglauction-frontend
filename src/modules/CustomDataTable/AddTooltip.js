import AddCircleIcon from '@mui/icons-material/AddCircle';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import PropTypes from 'prop-types';

export default function BasicTooltip({onAdd}) {
  return (
    <Tooltip title='Add'>
      <IconButton onClick={onAdd}>
        <AddCircleIcon />
      </IconButton>
    </Tooltip>
  );
}

BasicTooltip.propTypes = {
  onAdd: PropTypes.func,
};
