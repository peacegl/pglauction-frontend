import {Card, Chip, Typography, useTheme} from '@mui/material';
import IntlMessages from '@crema/utility/IntlMessages';
import {TabContext, TabList} from '@mui/lab';
import TabPanel from '@mui/lab/TabPanel';
import List from '@mui/material/List';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import {useState} from 'react';
import Item from './Item';

export default function LotInfo({vehicle}) {
  const [value, setValue] = useState('lot_info');
  const theme = useTheme();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const SingleTab = (index, label) => {
    return (
      <Tab
        label={
          <Typography
            component='div'
            fontSize='14px'
            fontWeight='bold'
            overflow='hidden'
            sx={{
              textTransform: 'capitalize',
              color:
                value == index
                  ? theme.palette.primary.contrastText
                  : theme.palette.primary.main,
            }}
          >
            {label}
          </Typography>
        }
        value={index}
        sx={{
          backgroundColor:
            value == index
              ? theme.palette.primary.main
              : theme.palette.primary.contrastText,
        }}
      />
    );
  };

  return (
    <Card sx={{borderRadius: 1, boxShadow: 1, m: 0}}>
      <TabContext value={value} width='100%'>
        <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
          <TabList
            onChange={handleChange}
            aria-label='lab API tabs example'
            variant='fullWidth'
          >
            {SingleTab(
              'lot_info',
              <>
                <IntlMessages id='common.lot' />#{vehicle.lot_number}
              </>,
            )}
            {SingleTab(
              'more_info',
              <IntlMessages id='common.more_information' />,
            )}
          </TabList>
        </Box>
        <TabPanel value='lot_info' sx={{py: 0}}>
          <List sx={{width: '100%', bgcolor: 'background.paper'}}>
            <Item
              label={<IntlMessages id='common.status' />}
              value={
                <Chip
                  sx={{
                    px: 2,
                    textTransform: 'capitalize',
                    fontWeight: 'bold',
                    color: (theme) => theme.palette.primary.contrastText,
                    bgcolor: (theme) =>
                      vehicle.status == 'sold'
                        ? theme.palette.error.main
                        : vehicle.status == 'available'
                        ? theme.palette.success.main
                        : '#ffa834',
                  }}
                  label={
                    vehicle.status == 'future' ? 'On The Way' : vehicle.status
                  }
                  size='small'
                />
              }
            />
            <Item
              label={<IntlMessages id='common.vin' />}
              value={vehicle.vin}
            />
            <Item
              label={<IntlMessages id='vehicle.document_type' />}
              value={vehicle.document_type}
            />
            <Item
              label={<IntlMessages id='vehicle.odometer' />}
              value={vehicle.odometer_type}
            />
            <Item
              label={<IntlMessages id='vehicle.primary_damage' />}
              value={vehicle.primary_damage}
            />
            <Item
              label={<IntlMessages id='vehicle.engine_type' />}
              value={vehicle.engine_type}
            />
            <Item
              label={<IntlMessages id='vehicle.cylinder' />}
              value={vehicle.cylinder}
            />
            <Item
              label={<IntlMessages id='vehicle.transmission' />}
              value={vehicle.transmission}
            />
            <Item
              label={<IntlMessages id='vehicle.fuel' />}
              value={vehicle.fuel}
            />
            <Item
              label={<IntlMessages id='vehicle.keys' />}
              value={
                vehicle.keys ? (
                  <IntlMessages id='common.available' />
                ) : (
                  <IntlMessages id='common.not_available' />
                )
              }
            />
            <Item
              label={<IntlMessages id='vehicle.body_style' />}
              value={vehicle.body_style}
            />
            <Item
              label={<IntlMessages id='vehicle.exterior_color' />}
              value={vehicle.exterior_color}
            />
            <Item
              label={<IntlMessages id='vehicle.interior_color' />}
              value={vehicle.interior_color}
            />
            <Item
              label={<IntlMessages id='vehicle.drive_type' />}
              value={vehicle.drive_type}
            />

            <Item
              label={<IntlMessages id='vehicle.test_drive' />}
              value={
                vehicle.test_drive ? (
                  <IntlMessages id='common.yes' />
                ) : (
                  <IntlMessages id='common.no' />
                )
              }
              sx={{borderBottom: 0}}
            />
          </List>
        </TabPanel>
        <TabPanel value='more_info' sx={{pt: 3, pb: 7}}>
          <Typography
            sx={{
              color: theme.palette.primary.main,
              fontWeight: 'bold',
              fontSize: '16px',
              py: 2,
            }}
          >
            About this {vehicle.make} {vehicle.model}
          </Typography>
          <Typography
            px={3}
            dangerouslySetInnerHTML={{__html: vehicle.description}}
          />
        </TabPanel>
      </TabContext>
    </Card>
  );
}
LotInfo.propTypes = {
  vehicle: PropTypes.any,
};
