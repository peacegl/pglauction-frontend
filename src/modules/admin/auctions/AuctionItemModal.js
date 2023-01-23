import AppTextField from '@crema/core/AppFormComponents/AppTextField';
import IntlMessages from '@crema/utility/IntlMessages';
import AuctionConfigs from 'configs/pages/auctions';
import CustomModal from 'components/CustomModal';
import {Box, Stack, Chip} from '@mui/material';
import PropTypes from 'prop-types';
import {useIntl} from 'react-intl';

const AuctionItemModal = ({
  open,
  toggleOpen,
  width,
  vehicle,
  setfieldvalue,
  items,
  ...rest
}) => {
  const {messages} = useIntl();
  const validationSchema = AuctionConfigs().itemSchema;
  const onSave = (values) => {
    let item = {...vehicle, ...values};
    let index = items.findIndex((item) => item.id == vehicle.id);
    if (index == -1) {
      setfieldvalue('items', [item, ...items]);
    }
    toggleOpen();
  };
  return (
    <CustomModal
      open={open}
      toggleOpen={toggleOpen}
      width={500}
      onSave={onSave}
      title={<IntlMessages id='auction.auctionItemDetails' />}
      validationSchema={validationSchema}
      initialValues={{
        minimum_bid: '',
        buy_now_price: '',
      }}
      isLoading={false}
      {...rest}
    >
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
              placeholder={messages['vehicle.minimumBidPlaceholder']}
              label={<IntlMessages id='vehicle.minimumBid' />}
              name='minimum_bid'
              variant='outlined'
              size='small'
              sx={{flex: 1}}
            />
          </Stack>
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
        </Stack>
      </Box>
    </CustomModal>
  );
};

export default AuctionItemModal;

AuctionItemModal.propTypes = {
  open: PropTypes.bool.isRequired,
  width: PropTypes.number,
  toggleOpen: PropTypes.func.isRequired,
  vehicle: PropTypes.object,
  setfieldvalue: PropTypes.func.isRequired,
  items: PropTypes.array,
};
