import {
  Card,
  Box,
  Modal,
  Paper,
  IconButton,
  Button,
  Stack,
  Chip,
} from '@mui/material';
import IntlMessages from '@crema/utility/IntlMessages';
import CloseIcon from '@mui/icons-material/Close';
import {useState, useLayoutEffect} from 'react';
import PropTypes from 'prop-types';
import AppTextField from '@crema/core/AppFormComponents/AppTextField';
import {useIntl} from 'react-intl';

const AuctionItemModal = ({
  open,
  toggleOpen,
  width,
  vehicle,
  setVehicle,
  setfieldvalue,
  items,
  ...rest
}) => {
  const [size, setSize] = useState([0]);
  const {messages} = useIntl();

  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return (
    <Modal {...rest} open={open}>
      <Card
        sx={{
          mt: 30,
          mx: 'auto',
          width: width
            ? size >= width
              ? width
              : size - 10
            : size >= 600
            ? 600
            : size - 10,
          bgcolor: 'background.paper',
          boxShadow: 1,
          borderRadius: 2,
        }}
      >
        <Box sx={{display: 'flex', flexDirection: 'row-reverse'}}>
          <IconButton aria-label='close' onClick={toggleOpen}>
            <CloseIcon sx={{fontSize: 18}} />
          </IconButton>
        </Box>
        <Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              mb: 6,
            }}
          >
            <Box component='img' src={vehicle?.images[0]?.path} width={200} />
            <Chip
              label={`${vehicle.lot_number} - ${vehicle.vin}`}
              color='success'
              variant='outlined'
              sx={{mt: 3}}
            />
          </Box>
          <Stack
            spacing={{xs: 5, md: 8}}
            sx={{
              m: 3,
            }}
          >
            <Stack direction={{xs: 'column', md: 'row'}} spacing={5}>
              <AppTextField
                placeholder={messages['vehicle.buyNowPricePlaceholder']}
                label={<IntlMessages id='vehicle.buyNowPrice' />}
                name='buy_now_price'
                variant='outlined'
                size='small'
                sx={{flex: 1}}
              />
            </Stack>
            <Stack direction={{xs: 'column', md: 'row'}} spacing={5}>
              <AppTextField
                placeholder={messages['vehicle.minimumBidPlaceholder']}
                label={<IntlMessages id='vehicle.minimumBid' />}
                name='minimum_bid'
                variant='outlined'
                size='small'
                sx={{flex: 1}}
              />
            </Stack>
          </Stack>
          <Paper
            sx={{
              mt: 4,
              py: 2,
            }}
          >
            <Box
              sx={{
                my: 2,
                mx: 3,
              }}
            >
              <Button
                variant='contained'
                sx={{
                  borderRadius: 1,
                  width: '100%',
                }}
              >
                <IntlMessages id='common.save' />
              </Button>
            </Box>
          </Paper>
        </Box>
      </Card>
    </Modal>
  );
};

export default AuctionItemModal;

AuctionItemModal.propTypes = {
  open: PropTypes.bool.isRequired,
  width: PropTypes.number,
  toggleOpen: PropTypes.func.isRequired,
  vehicle: PropTypes.object,
  setVehicle: PropTypes.func,
  setfieldvalue: PropTypes.func.isRequired,
  items: PropTypes.array,
};
// ('items', [
//   vehicle,
//   ...props.values.items,
// ])
