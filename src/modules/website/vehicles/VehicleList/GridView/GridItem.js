import {Box, Divider, Button, useTheme} from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import AppTooltip from '@crema/core/AppTooltip';
import Card from '@mui/material/Card';
import {useRouter} from 'next/router';
import {moneyFormater} from 'configs';
import PropTypes from 'prop-types';
import IntlMessages from '@crema/utility/IntlMessages';

export default function GridItem({item, ...props}) {
  const router = useRouter();
  const theme = useTheme();
  // const [height, setHeight] = useState('260px');

  // useLayoutEffect(() => {
  //   setHeight((cardRef.current?.clientWidth / 4) * 3 + 'px');
  // });

  return (
    <Card sx={{borderRadius: 1}}>
      <Box
        sx={{cursor: 'pointer'}}
        overflow='hidden'
        onClick={() => router.push(`/all-vehicles/${item.id}`)}
      >
        <CardMedia
          component='img'
          // height={height}
          image={item.images.find((item) => item.type == 'main_image').path}
          alt='preview'
          sx={{
            objectFit: 'cover',
            transition: 'all 450ms ease-out',
            '&:hover': {
              transform: 'scale(1.2)',
            },
          }}
        />
      </Box>
      <CardContent>
        <AppTooltip title={`${item.year} ${item.make} ${item.model}`}>
          <Typography
            onClick={() => router.push(`/all-vehicles/${item.id}`)}
            noWrap
            gutterBottom
            variant='h4'
            component='h4'
            color={theme.palette.primary.main}
            sx={{cursor: 'pointer'}}
          >
            {item.year} {item.make} {item.model}
          </Typography>
        </AppTooltip>
        <Divider sx={{my: 2}} />
        <Box display='flex' justifyContent='space-between'>
          <Typography color={theme.palette.primary.main} fontWeight='bold'>
            {moneyFormater(item.price)}
          </Typography>
          <Typography color={theme.palette.primary.main}>
            {item.odometer} <IntlMessages id='common.miles' />
          </Typography>
        </Box>
        <Box display='flex' flexDirection='column'>
          <Box display='flex' columnGap='5px'>
            <IntlMessages id='common.lot' />#
            <Typography color={theme.palette.primary.main}>
              {' '}
              {item.lot_number}
            </Typography>
          </Box>
          <Box display='flex' columnGap='5px'>
            <IntlMessages id='common.vin' />
            <Typography color={theme.palette.primary.main}>
              {' '}
              {item.vin}
            </Typography>
          </Box>
          <Box display='flex' columnGap='5px'>
            <IntlMessages id='common.location' />
            <Typography color={theme.palette.primary.main}>
              {' '}
              {item.location?.name}
            </Typography>
          </Box>
        </Box>
        <Box
        // display='flex'
        // justifyContent='space-between'
        // alignItems='center'
        >
          {/* <Button
              flex='1'
              variant='outlined'
              borderRadius='28'
              size='small'
              sx={{mt: 2, px: 2}}
              href=''
            >
              <BookmarkAddIcon />
              Watch
            </Button> */}
          <Button
            onClick={(e) => e.stopPropagation()}
            variant='contained'
            size='small'
            sx={{mt: 2, width: '100%'}}
            href='https://wa.me/+937669086'
            target='_blank'
          >
            <WhatsAppIcon sx={{mx: 1}} />
            +937669086
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
GridItem.propTypes = {
  item: PropTypes.object.isRequired,
};
