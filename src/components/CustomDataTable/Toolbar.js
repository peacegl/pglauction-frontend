import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import AppsDeleteIcon from '@crema/core/AppsDeleteIcon';
import AppTooltip from '@crema/core/AppTooltip';
import IntlMessages from '@crema/utility/IntlMessages';
import SellIcon from '@mui/icons-material/Sell';
import VerifiedIcon from '@mui/icons-material/Verified';

export default function DefaultToolbar({
  onEdit,
  onDelete,
  deleteTitle,
  selected,
  onSell,
  showSell = false,
  selectedItems = [],
  showDeleteButton,
  showEditButton,
  showApproval = false,
  onApproval=()=>{},
}) {
  return (
    <Box style={{display: 'flex'}} sx={{mx: 4, my: 1.75}}>
      {showApproval && selected.length > 0 && (
        <AppTooltip title={<IntlMessages id='common.approve' />}>
          <IconButton color='info' onClick={onApproval}>
            <VerifiedIcon sx={{fontSize: '22px'}} />
          </IconButton>
        </AppTooltip>
      )}
      {showSell &&
        selected.length == 1 &&
        selectedItems[0].status != 'sold' && (
          <AppTooltip title={<IntlMessages id='common.sell' />}>
            <IconButton color='info' onClick={onSell}>
              <SellIcon sx={{fontSize: '22px'}} />
            </IconButton>
          </AppTooltip>
        )}
      {showEditButton && selected.length == 1 && (
        <AppTooltip title={<IntlMessages id='common.edit' />}>
          <IconButton color='info' onClick={onEdit}>
            <EditIcon />
          </IconButton>
        </AppTooltip>
      )}
      {showDeleteButton && (
        <AppsDeleteIcon
          deleteAction={onDelete}
          deleteTitle={deleteTitle}
          sx={{
            cursor: 'pointer',
            color: 'text.disabled',
          }}
        />
      )}
    </Box>
  );
}

DefaultToolbar.propTypes = {
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  deleteTitle: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  selected: PropTypes.array,
  onSell: PropTypes.func,
  selectedItems: PropTypes.array,
  showSell: PropTypes.bool,
  showDeleteButton: PropTypes.bool,
  showEditButton: PropTypes.bool,
};
