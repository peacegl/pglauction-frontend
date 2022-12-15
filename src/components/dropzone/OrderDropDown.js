import {KeyboardArrowDown} from '@mui/icons-material';
import {Chip, Menu, MenuItem} from '@mui/material';
import {useState} from 'react';
import PropsTypes from 'prop-types';

const OrderDropDown = ({total, selectedItem, onChanged}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (item) => {
    onChanged(item);
    setAnchorEl(null);
  };
  return (
    <div>
      <Chip
        label={selectedItem}
        onClick={(e) => setAnchorEl(e.currentTarget)}
        onDelete={(e) => setAnchorEl(e.currentTarget)}
        deleteIcon={<KeyboardArrowDown />}
        color='primary'
        size='small'
      />
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={(e) => setAnchorEl(null)}
      >
        {(() => {
          let rows = [];
          for (let i = 1; i <= total; i++) {
            rows.push(
              <MenuItem value={i} key={i} onClick={(e) => handleClick(i)}>
                {i}
              </MenuItem>,
            );
          }
          return rows;
        })()}
      </Menu>
    </div>
  );
};

export default OrderDropDown;
OrderDropDown.propTypes = {
  selectedItem: PropsTypes.any,
  total: PropsTypes.number,
  onChanged: PropsTypes.func,
};
