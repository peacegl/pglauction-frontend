import AppsPagination from '@crema/core/AppsPagination';
import IntlMessages from '@crema/utility/IntlMessages';
import {useDispatch, useSelector} from 'react-redux';
import IconButton from '@mui/material/IconButton';
import {setVehicleSearch} from 'redux/actions';
import {styled} from '@mui/material/styles';
import PropTypes from 'prop-types';
import {
  alpha,
  Badge,
  Box,
  Chip,
  Hidden,
  Stack,
  Typography,
} from '@mui/material';

const Header = ({list, page, perPage, totalProducts, onPageChange, title}) => {
  const {search = ''} = useSelector(({webVehicles}) => webVehicles);
  const dispatch = useDispatch();

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
          pl: 3,
        }}
      >
        <Typography variant='h2' color='primary'>
          <IntlMessages id={title} />
        </Typography>
        <Badge
          badgeContent={totalProducts}
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
  make: PropTypes.any,
  title: PropTypes.any,
  onLClick: PropTypes.func,
  onGClick: PropTypes.func,
};
