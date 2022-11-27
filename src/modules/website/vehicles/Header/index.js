import React, {useEffect} from 'react';
import {
  alpha,
  Badge,
  Box,
  Chip,
  Hidden,
  Stack,
  Typography,
} from '@mui/material';
import ListIcon from '@mui/icons-material/List';
import AppsIcon from '@mui/icons-material/Apps';
import {useDispatch, useSelector} from 'react-redux';
import {VIEW_TYPE} from 'redux/reducers/AuctionItems';
import IconButton from '@mui/material/IconButton';
import PropTypes from 'prop-types';
import {setAuctionViewType, setVehicleSearch} from '../../../../redux/actions';
import {styled} from '@mui/material/styles';
import clsx from 'clsx';
import AppsPagination from '@crema/core/AppsPagination';
import {useTheme} from '@mui/material';

const IconBtn = styled(IconButton)(({theme}) => {
  return {
    color: theme.palette.text.disabled,
    backgroundColor: alpha(theme.palette.primary.main, 0.05),
    padding: 8,
    '&:hover, &:focus': {
      color: theme.palette.primary.main,
    },
    '&.active': {
      color: theme.palette.primary.main,
    },
  };
});
const Header = ({
  onSearch,
  viewType,
  list,
  page,
  perPage,
  totalProducts,
  onPageChange,
}) => {
  const {search = ''} = useSelector(({webVehicles}) => webVehicles);
  const {total = 0} = useSelector(({webVehicles}) => webVehicles.vehiclesData);
  const dispatch = useDispatch();
  const theme = useTheme();

  const onDeleteSearch = () => {
    dispatch(setVehicleSearch(''));
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flex: 1,
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Typography variant='h1' color='primary'>
          All Vehicles
        </Typography>
        <Badge
          badgeContent={total}
          max={99999999}
          color='primary'
          sx={{ml: 6}}
        />
        {search && (
          <Box sx={{ml: 7}}>
            <Chip
              variant='outlined'
              color='primary'
              ml='20px'
              label={`Search: ${search}`}
              onDelete={onDeleteSearch}
            />
          </Box>
        )}
      </Box>

      <Stack
        spacing={2}
        direction='row'
        sx={{
          display: 'flex',
          alignItems: 'center',
          ml: 'auto',
        }}
      >
        <IconBtn
          onClick={() => dispatch(setAuctionViewType(VIEW_TYPE.LIST))}
          className={clsx({
            active: viewType === VIEW_TYPE.LIST,
          })}
        >
          <ListIcon />
        </IconBtn>
        <IconBtn
          onClick={() => dispatch(setAuctionViewType(VIEW_TYPE.GRID))}
          className={clsx({
            active: viewType === VIEW_TYPE.GRID,
          })}
        >
          <AppsIcon />
        </IconBtn>
        <Hidden smDown>
          {list.length > 0 ? (
            <Box
              component='span'
              sx={{
                ml: {sm: 'auto'},
              }}
            >
              <AppsPagination
                rowsPerPage={perPage}
                count={totalProducts}
                page={page}
                onPageChange={onPageChange}
              />
            </Box>
          ) : null}
        </Hidden>
      </Stack>
    </Box>
  );
};

export default Header;

Header.propTypes = {
  viewType: PropTypes.number,
  onSearch: PropTypes.func,
  list: PropTypes.array,
  page: PropTypes.number,
  perPage: PropTypes.number,
  totalProducts: PropTypes.number,
  onPageChange: PropTypes.func,
};
