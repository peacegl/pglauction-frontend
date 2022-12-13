import {Box, Divider, Button, useTheme, Chip} from '@mui/material';
import SoldIcon from '../../../../../assets/icon/sold.png';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import IntlMessages from '@crema/utility/IntlMessages';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import AppTooltip from '@crema/core/AppTooltip';
import Card from '@mui/material/Card';
import {useRouter} from 'next/router';
import {moneyFormater} from 'configs';
import PropTypes from 'prop-types';
import {useState} from 'react';
import DefaultCarImage from 'assets/default_car_image.png';

export default function GridItem({item, ...props}) {
  const router = useRouter();
  const theme = useTheme();
  // const [height, setHeight] = useState('260px');
  const [hoverImage, setHoverImage] = useState(false);

  // useLayoutEffect(() => {
  //   setHeight((cardRef.current?.clientWidth / 4) * 3 + 'px');
  // });

  return (
    <Card sx={{borderRadius: 1}}>
      <Box
        sx={{cursor: 'pointer'}}
        overflow='hidden'
        onClick={() => router.push(`/all-vehicles/${item.id}`)}
        onMouseEnter={() => setHoverImage(true)}
        onMouseLeave={() => setHoverImage(false)}
      >
        {item.status == 'sold' && (
          <Box position='relative' zIndex='100'>
            <Box
              sx={{
                position: 'absolute',
                top: 5,
                left: 5,
                transform: 'rotate(-40deg)',
              }}
              width='45px'
              component='img'
              src={SoldIcon.src}
              alt={item.name}
            />
          </Box>
        )}
        <CardMedia
          component='img'
          // height={height}
          image={
            item.images?.find((item) => item.type == 'main_image')?.path ??
            DefaultCarImage.src
          }
          onError={(event) => (event.target.src = DefaultCarImage.src)}
          alt='preview'
          sx={{
            objectFit: 'cover',
            transition: 'all 450ms ease-out',
            transform: hoverImage ? 'scale(1.2)' : 'scale(1)',
          }}
        />
      </Box>
      <CardContent>
        <Box sx={{display: 'flex'}}>
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
        </Box>
        <Divider sx={{mb: 2}} />
        <Box display='flex' justifyContent='space-between'>
          <Typography color={theme.palette.primary.main} fontWeight='bold'>
            {moneyFormater(item.price)}
          </Typography>
          <Typography color={theme.palette.primary.main}>
            {item.odometer} <IntlMessages id='common.miles' />
          </Typography>
        </Box>
        <Box sx={{mt: 1}}>
          <Chip
            sx={{
              float: 'right',
              textTransform: 'capitalize',
              fontWeight: 'bold',
              color: (theme) => theme.palette.primary.contrastText,
              bgcolor: (theme) =>
                item.status == 'sold'
                  ? theme.palette.error.main
                  : item.status == 'available'
                  ? theme.palette.success.main
                  : '#ffa834',
            }}
            label={item.status}
            size='small'
          />
          <Box display='flex' columnGap='5px'>
            <IntlMessages id='common.lot' />#
            <Typography color={theme.palette.primary.main}>
              {item.lot_number}
            </Typography>
          </Box>
          <Box display='flex' columnGap='5px'>
            <IntlMessages id='common.vin' />
            <Typography color={theme.palette.primary.main}>
              {item.vin}
            </Typography>
          </Box>
          <Box display='flex' columnGap='5px'>
            <IntlMessages id='common.location' />
            <Typography noWrap gutterBottom color={theme.palette.primary.main}>
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
            href={`https://wa.me/${item.seller?.loginable?.whatsapp}`}
            target='_blank'
          >
            <WhatsAppIcon sx={{mx: 1}} />
            {item.seller?.loginable?.whatsapp}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
GridItem.propTypes = {
  item: PropTypes.object.isRequired,
};
