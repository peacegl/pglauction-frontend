import AppAutocompleteField from '@crema/core/AppFormComponents/AppAutocompleteField';
import AppDateTimeField from '@crema/core/AppFormComponents/AppDateTimeField';
import AppTextField from '@crema/core/AppFormComponents/AppTextField';
import IntlMessages from '@crema/utility/IntlMessages';
import jwtAxios from '@crema/services/auth/jwt-auth';
import {useEffect, useState} from 'react';
import {Box, Stack} from '@mui/material';
import {useIntl} from 'react-intl';
import PropTypes from 'prop-types';

const VehicleStepTwo = (props) => {
  const [locationLoading, setLocationLoading] = useState(false);
  const [categoryLoading, setCategoryLoading] = useState(false);
  const [locations, setLocations] = useState([]);
  const [categories, setCategories] = useState([]);

  const fetchData = async (url, content, loading, setData) => {
    try {
      loading(true);
      const res = await jwtAxios.get(url, {params: content});
      if (res.status === 200 && res.data.result) {
        setData(res.data.data);
      } else {
        setData([]);
      }
      loading(false);
    } catch (error) {
      setData([]);
      loading(false);
    }
  };
  const searchCategories = (content) => {
    fetchData(
      `/locations/auto_complete`,
      content,
      setLocationLoading,
      setLocations,
    );
  };
  const searchLocations = (content) => {
    fetchData(
      `/categories/auto_complete`,
      content,
      setCategoryLoading,
      setCategories,
    );
  };

  useEffect(() => {
    fetchData(`/locations/auto_complete`, {}, setLocationLoading, setLocations);
    fetchData(
      `/categories/auto_complete`,
      {},
      setLocationLoading,
      setLocations,
    );
  }, []);

  const {messages} = useIntl();
  return (
    <Box>
      <Stack spacing={{xs: 5, md: 8}}>
        <Stack direction={{xs: 'column', md: 'row'}} spacing={5}>
          <AppAutocompleteField
            placeholder={messages['vehicle.locationPlaceholder']}
            label={<IntlMessages id='vehicle.location' />}
            name='location_id'
            variant='outlined'
            size='small'
            sx={{flex: 1, width: '100%'}}
            dataLoading={locationLoading}
            options={locations}
            keyName='location_name'
            onSearch={searchLocations}
          />
          <AppAutocompleteField
            placeholder={messages['vehicle.categoryPlaceholder']}
            label={<IntlMessages id='vehicle.category' />}
            name='category_id'
            variant='outlined'
            size='small'
            sx={{flex: 1, width: '100%'}}
            dataLoading={categoryLoading}
            options={categories}
            keyName='category_name'
            onSearch={searchCategories}
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
        <Stack direction={{xs: 'column', md: 'row'}} spacing={5}>
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
        </Stack>
      </Stack>
    </Box>
  );
};

export default VehicleStepTwo;

VehicleStepTwo.propTypes = {
  values: PropTypes.object,
  setfieldvalue: PropTypes.func,
};
