import {Box, Divider, Button, useTheme, Chip} from '@mui/material';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import DefaultCarImage from 'assets/default_car_image.png';
import SoldIcon from '../../../../../assets/icon/sold.png';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import IntlMessages from '@crema/utility/IntlMessages';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import AppTooltip from '@crema/core/AppTooltip';
import {useEffect, useState} from 'react';
import Card from '@mui/material/Card';
import {useRouter} from 'next/router';
import {moneyFormater} from 'configs';
import PropTypes from 'prop-types';
export default function GridItem({item, ...props}) {
  const router = useRouter();
  const theme = useTheme();
  // const [height, setHeight] = useState('260px');
  const [hoverImage, setHoverImage] = useState(false);
  const [addedToWatchList, setAddedToWatchList] = useState(false);

  // useLayoutEffect(() => {
  //   setHeight((cardRef.current?.clientWidth / 4) * 3 + 'px');
  // });
  const [addressUrl, setAddressUrl] = useState('');
  // useEffect(() => {
  //   const origin =
  //     typeof window !== 'undefined' && window.location.origin
  //       ? window.location.origin
  //       : '';
  //   setAddressUrl(origin + router.asPath + `/${item.id}`);
  // }, []);
  const addToWarchList = () => {};
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
          {/* <Typography color={theme.palette.primary.main} fontWeight='bold'>
            {moneyFormater(
              parseInt(item.price) +
                parseInt((item.price * item.sale_rate ?? 15) / 100),
            )}
          </Typography> */}
          <Typography color={theme.palette.primary.main}>
            {item.odometer_type}
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
            label={item.status == 'future' ? 'On The Way' : item.status}
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
          display='flex'
          justifyContent='space-between'
          alignItems='center'
          sx={{flexWrap: 'wrap'}}
        >
          <Button
            variant='outlined'
            borderRadius='28'
            size='small'
            sx={{mt: 2, px: 2}}
            onClick={addToWarchList}
          >
            <BookmarkAddIcon />
            Watch
          </Button>
          <Button
            onClick={(e) => e.stopPropagation()}
            variant='contained'
            size='small'
            sx={{mt: 2}}
            href={`https://wa.me/${item.seller?.loginable?.whatsapp}?text=${window.location.origin}/all-vehicles/${item.id}`}
            target='_blank'
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <WhatsAppIcon sx={{mx: 1}} />
              <Box>{item.seller?.loginable?.whatsapp}</Box>
            </Box>
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
GridItem.propTypes = {
  item: PropTypes.object.isRequired,
};
