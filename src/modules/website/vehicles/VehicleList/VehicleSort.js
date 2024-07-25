import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Button from '@mui/material/Button';
import ListItemIcon from '@mui/material/ListItemIcon';
import Check from '@mui/icons-material/Check';
import { useDispatch, useSelector } from 'react-redux';
import { SET_VEHICLE_SORT } from 'shared/constants/ActionTypes'; 

const options = [
  {id:{column:'created_at',order:'desc'},label:'Newest to Oldest'},
  {id:{column:'created_at',order:'asc'},label:'Oldest to Newest'},

  {id:{column:'price',order:'desc'},label:'Price Highest to Lowest'},
  {id:{column:'price',order:'asc'},label:'Price Lowest to Highest'},

  {id:{column:'year',order:'desc'},label:'Year Highest to Lowest'},
  {id:{column:'year',order:'asc'},label:'Year Lowest to Highest'},
  {id:{column:'make',order:'desc'},label:'Make Highest to Lowest'},
  {id:{column:'make',order:'asc'},label:'Make Lowest to Highest'},
  {id:{column:'model',order:'desc'},label:'Model Highest to Lowest'},
  {id:{column:'model',order:'asc'},label:'Model Lowest to Highest'},
  {id:{column:'is_featured',order:'desc'},label:'Featured'},
  {id:{column:'is_best_selling',order:'desc'},label:'Best Selling'},
];

export default function VehicleSort() {
  const [anchorEl, setAnchorEl] = useState(null);
  const currentSort = useSelector(
    ({ webVehicles }) => webVehicles.sortBy,
  );
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();

  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (
    option,
  ) => {
    setAnchorEl(null);
    dispatch({type: SET_VEHICLE_SORT, payload: option});
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <List
        component="nav"
        aria-label="Device settings"
        sx={{ bgcolor: 'background.paper' }}
      >
        <Button
        id="lock-button"
        aria-controls={'lock-menu'}
        aria-haspopup="listbox"
        aria-expanded={open ? 'true' : undefined}
        variant="contained"
        disableElevation
        sx={{
            borderRadius: 1,
        }}
        onClick={handleClickListItem}
        endIcon={<KeyboardArrowDownIcon />}
      >
        SORT BY
      </Button>
      </List>
      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'lock-button',
          role: 'listbox',
        }}
        PaperProps={{
            style: {
              maxHeight: 500,
              width: '30ch',
            },
          }}
      >
        {options.map((option, index) => (
          <MenuItem
            key={index}
            selected={JSON.stringify(option.id) === JSON.stringify(currentSort)}
            onClick={(event) => handleMenuItemClick(option.id)}
          >
               <ListItemIcon>
           {(JSON.stringify(option.id) === JSON.stringify(currentSort))  ? <Check />   : null}
          </ListItemIcon>
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
