import AppTextField from '@crema/core/AppFormComponents/AppTextField';
import IntlMessages from '@crema/utility/IntlMessages';
import AuctionConfigs from 'configs/pages/auctions';
import CustomModal from 'components/CustomModal';
import {Box, Stack, Chip, MenuItem} from '@mui/material';
import {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {useIntl} from 'react-intl';
import { CURRENCIES } from 'configs/pages/currency';

const AuctionItemModal = ({
  open,
  toggleOpen,
  width,
  vehicle,
  setfieldvalue,
  items,
  auctionItem,
  ...rest
}) => {
  const {messages} = useIntl();
  const [initialValues, setInitialValues] = useState({
    minimum_bid: '',
    buy_now_price: '',
    currency: 'AED',
  });
  const validationSchema = AuctionConfigs().itemSchema;

  useEffect(() => {
    if (auctionItem.id) {
      setInitialValues({
        minimum_bid: auctionItem.minimum_bid,
        buy_now_price: auctionItem.buy_now_price,
        currency: auctionItem.currency,
      });
    }
  }, [auctionItem]);

  const onSave = (values) => {
    let val = auctionItem.id ? auctionItem : vehicle;
    let item = {...val, ...values};
    let auctionItems = items;
    let index = auctionItems.findIndex((item) => item.id == val.id);
    if (index == -1) {
      setfieldvalue('items', [item, ...auctionItems]);
    } else {
      auctionItems.splice(index, 1, item);
      setfieldvalue('items', auctionItems);
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
      initialValues={initialValues}
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
          <Box
            component='img'
            src={
              auctionItem.id
                ? auctionItem?.images?.[0]?.path
                : vehicle?.images?.[0]?.path
            }
            width={200}
          />
          <Chip
            label={`${
              auctionItem.id ? auctionItem.lot_number : vehicle.lot_number
            } - ${auctionItem.id ? auctionItem.vin : vehicle.vin}`}
            color='success'
            variant='outlined'
            sx={{mt: 3}}
          />
        </Box>
        <Stack
          spacing={{xs: 5, md: 4}}
          sx={{
            m: 3,
          }}
        >
          <Stack direction={{xs: 'column', md: 'row'}} spacing={2}>
            <AppTextField
              placeholder={messages['vehicle.minimumBidPlaceholder']}
              label={<IntlMessages id='vehicle.minimumBid' />}
              name='minimum_bid'
              variant='outlined'
              size='small'
              sx={{flex: 1}}
            />
          </Stack>
          <Stack direction={{xs: 'column', md: 'row'}} spacing={2}>
            <AppTextField
              placeholder={messages['vehicle.buyNowPricePlaceholder']}
              label={<IntlMessages id='vehicle.buyNowPrice' />}
              name='buy_now_price'
              variant='outlined'
              size='small'
              sx={{flex: 1}}
            />
          </Stack>

          <AppTextField
            select
            clearable
            label={<IntlMessages id='common.currency' />}
            name='currency'
            variant='outlined'
            size='small'
            value={auctionItem?.currency}
            sx={{flex: 1}}
          >
            {CURRENCIES.map((currency, key) => (
              <MenuItem key={key} value={currency}>
                <Box sx={{textTransform: 'capitalize'}}>{currency}</Box>
              </MenuItem>
            ))}
          </AppTextField>

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
  vehicle: PropTypes.any,
  setfieldvalue: PropTypes.func.isRequired,
  items: PropTypes.array,
  auctionItem: PropTypes.object,
};
