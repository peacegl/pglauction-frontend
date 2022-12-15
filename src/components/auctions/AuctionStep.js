import AppAutocompleteField from '@crema/core/AppFormComponents/AppAutocompleteField';
import AppDateTimeField from '@crema/core/AppFormComponents/AppDateTimeField';
import AppTextField from '@crema/core/AppFormComponents/AppTextField';
import IntlMessages from '@crema/utility/IntlMessages';
import {Box, Stack} from '@mui/material';
import {useIntl} from 'react-intl';
import PropTypes from 'prop-types';

const AuctionStep = (props) => {
  const {messages} = useIntl();
  return (
    <Box>
      <Stack spacing={{xs: 5, md: 8}}>
        <Stack direction={{xs: 'column', md: 'row'}} spacing={5}>
          <AppAutocompleteField
            placeholder={messages['vehicle.sellerPlaceholder']}
            label={<IntlMessages id='vehicle.seller' />}
            name='seller_id'
            variant='outlined'
            size='small'
            sx={{flex: 1, width: '100%'}}
            dataLoading={props.sellersLoading}
            options={props.sellers}
            keyName='fullname'
            onSearch={props.searchSellers}
            value={props.values?.seller_id}
            handleChange={({name, value}) => props.setfieldvalue(name, value)}
          />
        </Stack>
        <Stack direction={{xs: 'column', md: 'row'}} spacing={5}>
          <AppAutocompleteField
            placeholder={messages['vehicle.locationPlaceholder']}
            label={<IntlMessages id='vehicle.location' />}
            name='location_id'
            variant='outlined'
            size='small'
            sx={{flex: 1, width: '100%'}}
            dataLoading={props.locationLoading}
            options={props.locations}
            keyName='name'
            onSearch={props.searchLocations}
            value={props.values?.location_id}
            handleChange={({name, value}) => props.setfieldvalue(name, value)}
          />
        </Stack>
        <Stack direction={{xs: 'column', md: 'row'}} spacing={5}>
          <AppTextField
            placeholder={messages['vehicle.titlePlaceholder']}
            label={<IntlMessages id='vehicle.title' />}
            name='title'
            variant='outlined'
            size='small'
            sx={{flex: 1}}
          />
          <AppTextField
            placeholder={messages['vehicle.subtitlePlaceholder']}
            label={<IntlMessages id='common.subtitle' />}
            name='subtitle'
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
          <AppTextField
            placeholder={messages['vehicle.minimumBidPlaceholder']}
            label={<IntlMessages id='vehicle.minimumBid' />}
            name='minimum_bid'
            variant='outlined'
            size='small'
            sx={{flex: 1}}
          />
        </Stack>
        {/* <Stack direction={{xs: 'column', md: 'row'}} spacing={5}>
          <AppDateTimeField
            placeholder={messages['vehicle.startDatePlaceholder']}
            label={<IntlMessages id='vehicle.startDate' />}
            value={props.values?.start_date}
            setfieldvalue={props.setfieldvalue}
            name='start_date'
            size='small'
            sx={{flex: 1}}
          />
          <AppDateTimeField
            placeholder={messages['vehicle.endDatePlaceholder']}
            label={<IntlMessages id='vehicle.endDate' />}
            value={props.values?.end_date}
            setfieldvalue={props.setfieldvalue}
            name='end_date'
            variant='outlined'
            size='small'
            sx={{flex: 1}}
          />
        </Stack> */}
      </Stack>
    </Box>
  );
};

export default AuctionStep;

AuctionStep.propTypes = {
  values: PropTypes.object,
  handleChange: PropTypes.func,
  setfieldvalue: PropTypes.func,
  locationLoading: PropTypes.bool,
  locations: PropTypes.array.isRequired,
  searchLocations: PropTypes.func.isRequired,
  categoryLoading: PropTypes.bool,
  sellersLoading: PropTypes.bool,
  categories: PropTypes.array.isRequired,
  sellers: PropTypes.array.isRequired,
  searchCategories: PropTypes.func.isRequired,
  searchSellers: PropTypes.func.isRequired,
  setIsLoading: PropTypes.func,
};
