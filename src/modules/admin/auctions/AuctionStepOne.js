import AppDateField from '@crema/core/AppFormComponents/AppDateField';
import AppTextField from '@crema/core/AppFormComponents/AppTextField';
import IntlMessages from '@crema/utility/IntlMessages';
import {Box, MenuItem, Stack} from '@mui/material';
import {useIntl} from 'react-intl';
import PropTypes from 'prop-types';

const AuctionStepOne = (props) => {
  const {messages} = useIntl();

  return (
    <Box>
      <Stack spacing={{xs: 5, md: 8}}>
        <Stack direction={{xs: 'column', md: 'row'}} spacing={5}>
          <AppTextField
            placeholder={messages['common.namePlaceholder']}
            label={<IntlMessages id='common.name' />}
            name='name'
            variant='outlined'
            size='small'
            sx={{flex: 1}}
          />
          <AppTextField
            select
            label={<IntlMessages id='common.status' />}
            name='status'
            variant='outlined'
            size='small'
            value={props.values?.status}
            sx={{flex: 1}}
          >
            <MenuItem value='active'>
              <IntlMessages id='common.active' />
            </MenuItem>
            <MenuItem value='inactive'>
              <IntlMessages id='common.inactive' />
            </MenuItem>
            <MenuItem value='pending'>
              <IntlMessages id='common.pending' />
            </MenuItem>
          </AppTextField>
        </Stack>
        <Stack direction={{xs: 'column', md: 'row'}} spacing={5}>
          <AppDateField
            label={<IntlMessages id='common.startDate' />}
            value={props.values?.start_date}
            setfieldvalue={(name, value) =>
              props.setfieldvalue(
                name,
                value
                  ? value.getFullYear() +
                      '/' +
                      (value.getMonth() + 1) +
                      '/' +
                      value.getDate()
                  : '',
              )
            }
            name='start_date'
            size='small'
            sx={{flex: 1}}
          />
          <AppDateField
            label={<IntlMessages id='common.endDate' />}
            value={props.values?.end_date}
            setfieldvalue={(name, value) =>
              props.setfieldvalue(
                name,
                value
                  ? value.getFullYear() +
                      '/' +
                      (value.getMonth() + 1) +
                      '/' +
                      value.getDate()
                  : '',
              )
            }
            name='end_date'
            size='small'
            sx={{flex: 1}}
          />
        </Stack>
      </Stack>
    </Box>
  );
};

export default AuctionStepOne;
AuctionStepOne.propTypes = {
  values: PropTypes.object,
  setfieldvalue: PropTypes.func,
};
