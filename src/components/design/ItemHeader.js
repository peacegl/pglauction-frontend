import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import useAddToWatchList from 'customHooks/useAddToWatchList';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import SignInModal from 'modules/auth/Signin/SignInModal';
import IntlMessages from '@crema/utility/IntlMessages';
import {ArrowBack} from '@mui/icons-material';
import {LoadingButton} from '@mui/lab';
import PropTypes from 'prop-types';
import {useState} from 'react';
import {
  alpha,
  Box,
  colors,
  Container,
  IconButton,
  Typography,
} from '@mui/material';

function ItemHeader({item, onBack, admin}) {
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
        my: 5,
        py: 2,
        minHeight: '70px',
        backgroundColor: 'white',
        border: '0',
        borderBottom: '1px',
        borderStyle: 'solid',
        borderColor: (theme) => alpha(theme.palette.primary.main, 0.2),
        color: colors.grey[800],
      }}
    >
      <Container maxWidth='xl'>
        <Box display='flex' justifyContent='space-between' alignItems='center'>
          <Box sx={{display: 'flex', alignItems: 'center'}}>
            {onBack && (
              <IconButton color='primary' onClick={onBack} sx={{mr: 1}}>
                <ArrowBack />
              </IconButton>
            )}
            <Box>
              <Typography
                component='h1'
                fontSize='22px'
                fontWeight='bold'
                overflow='hidden'
                pb={1}
              >
                {item?.year} {item?.make} {item?.model}
              </Typography>
              <Box display='flex' columnGap='8px'>
                <Typography component='div' overflow='hidden'>
                  <IntlMessages id='common.lot' />#{' '}
                  <Box component='span' display='inline' fontWeight='bold'>
                    {item.lot_number} |
                  </Box>
                </Typography>
                <Typography component='div' overflow='hidden'>
                  <IntlMessages id='common.sale_location' />{' '}
                  <Box component='span' display='inline' fontWeight='bold'>
                    {item.location?.name}
                  </Box>
                </Typography>
              </Box>
            </Box>
          </Box>
          {!admin && (
            <Box>
              <LoadingButton
                loading={watchlistLoading}
                loadingPosition='start'
                startIcon={
                  !addedToWatchList ? (
                    <BookmarkAddIcon />
                  ) : (
                    <BookmarkAddedIcon />
                  )
                }
                variant='outlined'
                size='small'
                onClick={() => addToWatchList(item.id)}
              >
                {!addedToWatchList ? (
                  <IntlMessages id='common.watch' />
                ) : (
                  <IntlMessages id='common.remove' />
                )}
              </LoadingButton>
            </Box>
          )}
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

export default ItemHeader;
ItemHeader.propTypes = {
  item: PropTypes.any,
  onBack: PropTypes.func,
  admin: PropTypes.bool,
};
