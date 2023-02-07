import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import IntlMessages from '@crema/utility/IntlMessages';
import {useAuthUser} from '@crema/utility/AuthHooks';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import List from '@mui/material/List';
import {moneyFormater} from 'configs';
import {useRouter} from 'next/router';
import moment from 'moment';
import Item from './Item';
import 'moment-timezone';
import {
  alpha,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from '@mui/material';

export default function LotInfo() {
  const {user} = useAuthUser();
  const {vehicle = {}} = useSelector(({webVehicles}) => webVehicles);
  let updatedAt = moment(
    vehicle?.updated_at,
    'YYYY-MM-DD HH:mm:ss',
    user?.timezone ? user.timezone : 'UTC',
  )
    .tz(user?.timezone ? user.timezone : moment.tz.guess())
    .format('YYYY-MM-DD hh:mm:ss A');

  const router = useRouter();
  // const [addressUrl, setAddressUrl] = useState('');
  // useEffect(() => {
  //   const origin =
  //     typeof window !== 'undefined' && window.location.origin
  //       ? window.location.origin
  //       : '';
  //   setAddressUrl(origin + router.asPath);
  // }, []);
  return (
    <Card sx={{borderRadius: 1, boxShadow: 1, m: 0}}>
      <CardHeader
        sx={{
          backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.9),
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
          {vehicle.location?.name && vehicle.status != 'future' && (
            <Item
              label={<IntlMessages id='vehicle.location' />}
              value={vehicle.location?.name}
            />
          )}
          {/* <Item
            label={<IntlMessages id='vehicle.price' />}
            value={moneyFormater(
              parseInt(vehicle.price) +
                parseInt((vehicle.price * vehicle.sale_rate ?? 15) / 100),
            )}
          /> */}
          <Item
            label={<IntlMessages id='common.last_updated' />}
            value={updatedAt}
          />
        </List>
        <Button
          variant='outlined'
          size='large'
          sx={{mt: 4, width: '100%', borderRadius: 20}}
          href={`https://wa.me/${vehicle.seller?.loginable?.whatsapp}?text=${window.location.origin}/all-vehicles/${vehicle.id}`}
          target='_blank'
        >
          <WhatsAppIcon />
          <Box pt='2px'>{vehicle.seller?.loginable?.whatsapp}</Box>
        </Button>
      </CardContent>
    </Card>
  );
}
