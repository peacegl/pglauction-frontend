import AppsPagination from '@crema/core/AppsPagination';
import IntlMessages from '@crema/utility/IntlMessages';
import {VIEW_TYPE} from 'redux/reducers/AuctionItems';
import {useDispatch, useSelector} from 'react-redux';
import IconButton from '@mui/material/IconButton';
import ListIcon from '@mui/icons-material/List';
import AppsIcon from '@mui/icons-material/Apps';
import {setVehicleSearch} from 'redux/actions';
import {ArrowBack} from '@mui/icons-material';
import {styled} from '@mui/material/styles';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  alpha,
  Badge,
  Box,
  Card,
  Chip,
  Hidden,
  Stack,
  Typography,
} from '@mui/material';

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
  viewType,
  list,
  page,
  perPage,
  totalProducts,
  onPageChange,
  title,
  onLClick,
  onGClick,
  onBack,
  name,
}) => {
  const {search = ''} = useSelector(({webVehicles}) => webVehicles);
  const dispatch = useDispatch();

  const onDeleteSearch = () => {
    dispatch(setVehicleSearch(''));
  };

  return (
    <Card
      sx={{
        m: 3,
        borderRadius: 1,
      }}
    >
      <Box
        sx={{
          height: 60,
          display: 'flex',
          alignItems: 'center',
          padding: {
            xs: '4px 10px',
            xl: '12px 10px',
          },
        }}
        className='apps-header'
      >
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
              pl: onBack ? 1 : 3,
            }}
          >
            {onBack && (
              <IconButton aria-label='delete' color='primary' onClick={onBack}>
                <ArrowBack />
              </IconButton>
            )}
            <Typography variant='h2' color='primary'>
              <IntlMessages id={title} />
            </Typography>
            {name && (
              <Typography
                variant='h2'
                color='primary'
                sx={{textTransform: 'capitalize', px: 1}}
              >
                {name}
              </Typography>
            )}
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
            {onLClick && onGClick && (
              <>
                <IconBtn
                  onClick={onLClick}
                  className={clsx({
                    active: viewType === VIEW_TYPE.LIST,
                  })}
                >
                  <ListIcon />
                </IconBtn>
                <IconBtn
                  onClick={onGClick}
                  className={clsx({
                    active: viewType === VIEW_TYPE.GRID,
                  })}
                >
                  <AppsIcon />
                </IconBtn>
              </>
            )}
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
      </Box>
    </Card>
  );
};

export default Header;

Header.propTypes = {
  viewType: PropTypes.number,
  list: PropTypes.array,
  page: PropTypes.number,
  perPage: PropTypes.number,
  totalProducts: PropTypes.number,
  onPageChange: PropTypes.func,
  make: PropTypes.any,
  title: PropTypes.any,
  onLClick: PropTypes.func,
  onGClick: PropTypes.func,
  onBack: PropTypes.func,
  name: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.node,
  ]),
};
