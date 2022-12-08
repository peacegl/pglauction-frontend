import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import PropTypes from 'prop-types';

export default function BasicTooltip({title, onClick, icon}) {
  return (
    <Tooltip title={title}>
      <IconButton onClick={onClick}>{icon}</IconButton>
    </Tooltip>
  );
}

BasicTooltip.propTypes = {
  onClick: PropTypes.func,
  title: PropTypes.any,
  icon: PropTypes.any,
};
