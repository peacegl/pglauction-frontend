import React from 'react';
import List from '@mui/material/List';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import {
  alpha,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
  useTheme,
} from '@mui/material';
import {useSelector} from 'react-redux';
import Item from './Item';
import {moneyFormater} from 'configs';
import IntlMessages from '@crema/utility/IntlMessages';

export default function LotInfo() {
  const theme = useTheme();
  const {vehicle = {}} = useSelector(({webVehicles}) => webVehicles);
  const contactNumber = '+9390876500';

  return (
    <Card sx={{borderRadius: 1, boxShadow: 1, m: 0}}>
      <CardHeader
        sx={{
          backgroundColor: alpha(theme.palette.primary.main, 0.9),
          color: 'white',
          p: 3,
        }}
        title={
          <Typography
            component='div'
            fontSize='16px'
            fontWeight='bold'
            overflow='hidden'
          >
            <IntlMessages id='common.sale_information' />
          </Typography>
        }
      />
      <CardContent sx={{px: 3, py: 0}}>
        <List sx={{width: '100%', bgcolor: 'background.paper', pb: 0}}>
          <Item
            label={<IntlMessages id='vehicle.location' />}
            value={vehicle.location?.name}
          />
          <Item
            label={<IntlMessages id='vehicle.price' />}
            value={moneyFormater(vehicle.price)}
          />
          <Item
            label={<IntlMessages id='common.last_updated' />}
            value={vehicle.updated_at}
          />
        </List>
        <Button
          variant='outlined'
          size='large'
          sx={{mt: 4, width: '100%', borderRadius: 20}}
          href={`https://wa.me/${contactNumber}`}
          target='_blank'
        >
          <WhatsAppIcon />
          <Box pt='2px'>{contactNumber}</Box>
        </Button>
      </CardContent>
    </Card>
  );
}
