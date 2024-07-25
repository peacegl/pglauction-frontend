import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import IntlMessages from '@crema/utility/IntlMessages';
import {useAuthUser} from '@crema/utility/AuthHooks';
import List from '@mui/material/List';
import {locationCurrencyFormatter} from 'configs';
import PropTypes from 'prop-types';
import moment from 'moment';
import Item from '../../design/Item';
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

export default function SaleInfo({vehicle, showPrice, admin}) {
  const {user} = useAuthUser();
  let updatedAt = moment(
    vehicle?.updated_at,
    'YYYY-MM-DD HH:mm:ss',
    user?.timezone ? user.timezone : 'UTC',
  )
    .tz(user?.timezone ? user.timezone : moment.tz.guess())
    .format('YYYY-MM-DD hh:mm:ss A');

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
          {vehicle.location?.name && vehicle.status !== 'future' && (
            <Item
              label={<IntlMessages id='vehicle.location' />}
              value={vehicle.location?.name}
            />
          )}
          {showPrice && (
            <Item
              label={<IntlMessages id='vehicle.price' />}
              value={locationCurrencyFormatter(
                parseInt(vehicle.price) +
                  parseInt((vehicle.price * vehicle.sale_rate ?? 15) / 100),
                  vehicle.location_id
              )}
            />
          )}
          <Item
            label={<IntlMessages id='common.last_updated' />}
            value={updatedAt}
          />
          {admin && (
            <>
              <Item
                label={<IntlMessages id='vehicle.price' />}
                value={locationCurrencyFormatter(
                  parseInt(vehicle.price) +
                    parseInt((vehicle.price * vehicle.sale_rate ?? 15) / 100,),
                    vehicle.location_id
                )}
              />
              <Item
                label={<IntlMessages id='common.saleRate' />}
                value={vehicle.sale_rate + '%'}
              />
              <Item
                label={<IntlMessages id='common.totalCost' />}
                value={locationCurrencyFormatter(vehicle.price,vehicle.location_id)}
              />
            </>
          )}
        </List>
        {!admin && (
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
        )}
      </CardContent>
    </Card>
  );
}

SaleInfo.propTypes = {
  vehicle: PropTypes.any,
  admin: PropTypes.bool,
  showPrice: PropTypes.bool,
};
