import AppTextField from '@crema/core/AppFormComponents/AppTextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import IntlMessages from '@crema/utility/IntlMessages';
import MenuItem from '@mui/material/MenuItem';
import Switch from '@mui/material/Switch';
import {Box} from '@mui/material';

export default function configs(filterData) {
  return {
    filterItems: [
      {
        key: 1,
        title: <IntlMessages id='filter.newly_added' />,
        content: (
          <Box
            sx={{
              mx: 3,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            {/* <AppTextField
              select
              label={<IntlMessages id='common.gender' />}
              name='gender'
              variant='outlined'
              size='small'
              value={filterData.newly_added.newly_added_duration}
              sx={{flex: 1}}
            >
              <MenuItem value='24' selected>
                <IntlMessages id='common.last_24_hours' />
              </MenuItem>
              <MenuItem value='female'>
                <IntlMessages id='common.last_7_days' />
              </MenuItem>
            </AppTextField> */}
            <FormControlLabel control={<Switch />} sx={{mx: 0}} />
          </Box>
        ),
      },
      {
        key: 2,
        title: <IntlMessages id='vehicle.odometer' />,
        content: <Box></Box>,
      },
      {
        key: 3,
        title: <IntlMessages id='common.year' />,
        content: <Box></Box>,
      },
      {
        key: 4,
        title: <IntlMessages id='common.make' />,
        content: <Box></Box>,
      },
      {
        key: 5,
        title: <IntlMessages id='vehicle.model' />,
        content: <Box></Box>,
      },
    ],
  };
}
