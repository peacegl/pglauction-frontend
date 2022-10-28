import AppTextField from '@crema/core/AppFormComponents/AppTextField';
import AppDateTimeField from '@crema/core/AppFormComponents/AppDateTimeField';
import IntlMessages from '@crema/utility/IntlMessages';
import {Box, Stack} from '@mui/material';
import {useIntl} from 'react-intl';

const VehicleStepTwo = () => {
  const {messages} = useIntl();

  return (
    <Box>
      <Stack spacing={{xs: 5, md: 8}}>
        <Stack direction={{xs: 'column', md: 'row'}} spacing={5}>
          <AppTextField
            placeholder={messages['vehicle.locationPlaceholder']}
            label={<IntlMessages id='vehicle.location' />}
            name='location_id'
            variant='outlined'
            size='small'
            sx={{flex: 1}}
          />
          <AppTextField
            placeholder={messages['vehicle.categoryPlaceholder']}
            label={<IntlMessages id='vehicle.category' />}
            name='category_id'
            variant='outlined'
            size='small'
            sx={{flex: 1}}
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
          <AppDateTimeField
            placeholder={messages['vehicle.startDatePlaceholder']}
            label={<IntlMessages id='vehicle.startDate' />}
            name='start_date'
            size='small'
            sx={{flex: 1}}
          />
          <AppDateTimeField
            placeholder={messages['vehicle.endDatePlaceholder']}
            label={<IntlMessages id='vehicle.endDate' />}
            name='end_date'
            variant='outlined'
            size='small'
            sx={{flex: 1}}
          />
        </Stack>
        <Stack direction={{xs: 'column', md: 'row'}} spacing={5}>
          <AppTextField
            placeholder={messages['vehicle.cylindersPlaceholder']}
            label={<IntlMessages id='vehicle.cylinders' />}
            name='cylinders'
            variant='outlined'
            size='small'
            sx={{flex: 1}}
          />
          <AppTextField
            placeholder={messages['vehicle.vehicleTypePlaceholder']}
            label={<IntlMessages id='vehicle.vehicleType' />}
            name='vehicle_type'
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
