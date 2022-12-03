import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import AppsDeleteIcon from '@crema/core/AppsDeleteIcon';
import AppTooltip from '@crema/core/AppTooltip';
import IntlMessages from '@crema/utility/IntlMessages';

export default function DefaultToolbar({
  onEdit,
  onDelete,
  deleteTitle,
  selected,
}) {
  return (
    <Box style={{display: 'flex'}} sx={{mx: 4, my: 1.75}}>
      {selected.length == 1 && (
        <AppTooltip title={<IntlMessages id='common.edit' />}>
          <IconButton color='info' onClick={onEdit}>
            <EditIcon />
          </IconButton>
        </AppTooltip>
      )}
      <AppsDeleteIcon
        deleteAction={onDelete}
        deleteTitle={deleteTitle}
        sx={{
          cursor: 'pointer',
          color: 'text.disabled',
        }}
      />
    </Box>
  );
}

DefaultToolbar.propTypes = {
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  deleteTitle: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  selected: PropTypes.array,
};
