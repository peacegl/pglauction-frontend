import {alpha, Box, colors, Container, Typography} from '@mui/material';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import useAddToWatchList from 'customHooks/useAddToWatchList';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import SignInModal from 'modules/auth/Signin/SignInModal';
import IntlMessages from '@crema/utility/IntlMessages';
import {useSelector} from 'react-redux';
import {LoadingButton} from '@mui/lab';
import PropTypes from 'prop-types';
import {useState} from 'react';

function Header({item}) {
  const {vehicle = {}} = useSelector(({webVehicles}) => webVehicles);
  const [showSignInModal, setShowSignInModl] = useState(false);
  const {addToWatchList, watchlistLoading, addedToWatchList} =
    useAddToWatchList(item, setShowSignInModl);

  return (
    <Box
      display='flex'
      alignItems='center'
      width='100%'
      position='static'
      zIndex='1'
      sx={{
        minHeight: '70px',
        backgroundColor: 'white',
        border: '0',
        py: 1,
        borderBottom: '1px',
        borderStyle: 'solid',
        borderColor: (theme) => alpha(theme.palette.primary.main, 0.2),
        color: colors.grey[800],
      }}
    >
      <Container maxWidth='xl'>
        <Box
          margin='auto'
          display='flex'
          justifyContent='space-between'
          alignItems='cemter'
        >
          <Box>
            <Typography
              component='h1'
              fontSize='22px'
              fontWeight='bold'
              overflow='hidden'
              pb={1}
            >
              {vehicle.year} {vehicle?.make} {vehicle.model}
            </Typography>
            <Box display='flex' columnGap='8px'>
              <Typography component='div' overflow='hidden'>
                <Box component='span' display='inline' fontWeight='bold'>
                  <IntlMessages id='common.lot' />#
                </Box>
                {vehicle.lot_number} |
              </Typography>
              <Typography component='div' overflow='hidden'>
                <Box component='span' display='inline' fontWeight='bold'>
                  <IntlMessages id='common.sale_location' />
                </Box>{' '}
                {vehicle.location?.name}
              </Typography>
            </Box>
          </Box>
          <Box>
            <LoadingButton
              loading={watchlistLoading}
              loadingPosition='start'
              startIcon={
                !addedToWatchList ? <BookmarkAddIcon /> : <BookmarkAddedIcon />
              }
              variant='outlined'
              size='small'
              sx={{mt: 2}}
              onClick={() => addToWatchList(item.id)}
            >
              {!addedToWatchList ? (
                <IntlMessages id='common.watch' />
              ) : (
                <IntlMessages id='common.remove' />
              )}
            </LoadingButton>
          </Box>
        </Box>
      </Container>
      {showSignInModal && (
        <SignInModal
          open={showSignInModal}
          toggleopen={() => setShowSignInModl((d) => !d)}
          width={500}
        />
      )}
    </Box>
  );
}

export default Header;
Header.propTypes = {
  item: PropTypes.any,
};
