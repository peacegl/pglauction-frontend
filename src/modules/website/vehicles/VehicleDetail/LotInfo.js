import React, {useState} from 'react';
import List from '@mui/material/List';
import {Card, Typography, useTheme} from '@mui/material';
import {useSelector} from 'react-redux';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TabPanel from '@mui/lab/TabPanel';
import {TabContext, TabList} from '@mui/lab';
import Item from './Item';

export default function SaleInfo() {
  const [value, setValue] = useState('lot_info');
  const theme = useTheme();
  const {vehicle = {}} = useSelector(({webVehicles}) => webVehicles);

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
            {SingleTab('lot_info', `Lot# ${vehicle.lot_number}`)}
            {SingleTab('more_info', 'More Information')}
          </TabList>
        </Box>
        <TabPanel value='lot_info' sx={{py: 0}}>
          <List sx={{width: '100%', bgcolor: 'background.paper'}}>
            <Item label='Vin:' value={vehicle.vin} />
            <Item label='Document Type:' value={vehicle.document_type} />
            <Item label='Odometer:' value={vehicle.odometer} />
            <Item label='Primary Damage:' value={vehicle.primary_damage} />
            <Item label='Engine Type:' value={vehicle.engine_type} />
            <Item label='cylinder:' value={vehicle.cylinder} />
            <Item label='Transmission:' value={vehicle.transmission} />
            <Item label='Fuel:' value={vehicle.fuel} />
            <Item
              label='Keys:'
              value={vehicle.keys ? 'Available' : 'Not Available'}
            />
            <Item label='Body Style:' value={vehicle.body_style} />
            <Item label='Exterior Color:' value={vehicle.exterior_color} />
            <Item label='Interior Color:' value={vehicle.interior_color} />
            <Item label='Drive Type:' value={vehicle.drive_type} />

            <Item
              label='Test Drive:'
              value={vehicle.test_drive ? 'Yes' : 'No'}
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
            About this {vehicle?.model?.make?.name} {vehicle.model?.name}
          </Typography>
          <Typography>{vehicle.description}</Typography>
        </TabPanel>
      </TabContext>
    </Card>
  );
}
