import {Box, Divider, Button, useTheme, Chip, Skeleton} from '@mui/material';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import useAddToWatchList from 'customHooks/useAddToWatchList';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import DefaultCarImage from 'assets/default_car_image.png';
import SoldIcon from '../../../../../assets/icon/sold.png';
import SignInModal from 'modules/auth/Signin/SignInModal';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import IntlMessages from '@crema/utility/IntlMessages';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import AppTooltip from '@crema/core/AppTooltip';
import {useEffect, useState} from 'react';
import {LoadingButton} from '@mui/lab';
import Card from '@mui/material/Card';
import {useRouter} from 'next/router';
import PropTypes from 'prop-types';

export default function GridItem({item, ...props}) {
  const router = useRouter();
  // const [height, setHeight] = useState('260px');
  const [hoverImage, setHoverImage] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showSignInModal, setShowSignInModl] = useState(false);
  const {addToWatchList, watchlistLoading, addedToWatchList} =
    useAddToWatchList(item, setShowSignInModl);
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
  return (
    <>
      <Card sx={{borderRadius: 1}}>
        {!item && (
          <Skeleton
            variant='rectangular'
            animation='wave'
            width='100%'
            height={200}
          />
        )}
        {item && (
          <Box
            sx={{cursor: 'pointer'}}
            overflow='hidden'
            onClick={() => router.push(`/all-vehicles/${item?.id}`)}
            onMouseEnter={() => setHoverImage(true)}
            onMouseLeave={() => setHoverImage(false)}
          >
            {item?.status == 'sold' && (
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
                  alt={item?.name}
                />
              </Box>
            )}
            {!imageLoaded && (
              <Skeleton
                variant='rectangular'
                animation='wave'
                width='100%'
                height={200}
              />
            )}
            <Box sx={imageLoaded ? {} : {display: 'none'}}>
              <CardMedia
                component='img'
                // height={height}
                image={
                  item.images?.find((item) => item.type == 'main_image')
                    ?.path ?? DefaultCarImage.src
                }
                onLoad={() => setImageLoaded(true)}
                onError={(event) => (event.target.src = DefaultCarImage.src)}
                alt='preview'
                sx={{
                  objectFit: 'cover',
                  transition: 'all 450ms ease-out',
                  transform: hoverImage ? 'scale(1.2)' : 'scale(1)',
                }}
              />
            </Box>
          </Box>
        )}
        <CardContent>
          {!item ? (
            <Typography gutterBottom variant='h4' component='h4'>
              <Skeleton animation='wave' />
            </Typography>
          ) : (
            <Box sx={{display: 'flex'}}>
              <AppTooltip title={`${item.year} ${item.make} ${item.model}`}>
                <Typography
                  onClick={() => router.push(`/all-vehicles/${item.id}`)}
                  noWrap
                  gutterBottom
                  variant='h4'
                  component='h4'
                  sx={{
                    cursor: 'pointer',
                    color: (theme) => theme.palette.primary.main,
                  }}
                >
                  {item.year} {item.make} {item.model}
                </Typography>
              </AppTooltip>
            </Box>
          )}

          <Divider sx={{mb: 2}} />
          <Box display='flex' justifyContent='space-between'>
            {/* <Typography color={theme.palette.primary.main} fontWeight='bold'>
            {moneyFormater(
              parseInt(item.price) +
                parseInt((item.price * item.sale_rate ?? 15) / 100),
            )}
            </Typography> */}
            {/* {item && <Typography>{item.odometer_type}</Typography>} */}
          </Box>

          <Box sx={{mt: 1}}>
            {!item ? (
              <Chip
                sx={{width: 80, float: 'right', ml: 4}}
                label={<Skeleton animation='wave' variant='rounded' />}
                size='small'
              />
            ) : (
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
                label={`Start from ${item?.auction_item?.minimum_bid}`}
                size='small'
              />
            )}
            <>
              <Box display='flex' columnGap='5px'>
                <IntlMessages id='common.lot' />#
                {!item ? (
                  <Typography sx={{flex: 1}}>
                    <Skeleton animation='wave' />
                  </Typography>
                ) : (
                  <Typography
                    sx={{color: (theme) => theme.palette.primary.main}}
                  >
                    {item.lot_number}
                  </Typography>
                )}
              </Box>
              <Box display='flex' columnGap='5px'>
                <IntlMessages id='common.vin' />
                {!item ? (
                  <Typography sx={{flex: 1}}>
                    <Skeleton animation='wave' />
                  </Typography>
                ) : (
                  <Typography
                    sx={{color: (theme) => theme.palette.primary.main}}
                  >
                    {item.vin}
                  </Typography>
                )}
              </Box>
              <Box display='flex' columnGap='5px'>
                <IntlMessages id='common.location' />
                {!item ? (
                  <Typography sx={{flex: 1}}>
                    <Skeleton animation='wave' />
                  </Typography>
                ) : (
                  <Typography
                    noWrap
                    gutterBottom
                    sx={{color: (theme) => theme.palette.primary.main}}
                  >
                    {item.location?.name}
                  </Typography>
                )}
              </Box>
            </>
          </Box>
          <Box
            display='flex'
            justifyContent='space-between'
            alignItems='center'
            sx={{flexWrap: 'wrap'}}
          >
            {!item ? (
              <Button size='small' sx={{mt: 2}}>
                <Skeleton animation='wave' sx={{width: 90, py: 3}} />
              </Button>
            ) : (
              <LoadingButton
                loading={watchlistLoading}
                loadingPosition='start'
                startIcon={
                  !addedToWatchList ? (
                    <BookmarkAddIcon />
                  ) : (
                    <BookmarkAddedIcon />
                  )
                }
                variant='outlined'
                size='small'
                sx={{mt: 2}}
                onClick={() => addToWatchList(item.id)}
              >
                {!addedToWatchList ? (
                  <IntlMessages id='common.watch' />
                ) : (
                  <IntlMessages id='common.remove' />
                )}
              </LoadingButton>
            )}
            {!item ? (
              <Button size='small' sx={{mt: 2}}>
                <Skeleton animation='wave' sx={{width: 100, py: 3}} />
              </Button>
            ) : (
              <Button
                onClick={(e) => e.stopPropagation()}
                variant='contained'
                size='small'
                sx={{mt: 2}}
              >
                Buy Now {item?.auction_item?.buy_now_price}
              </Button>
            )}
          </Box>
        </CardContent>
      </Card>
      {showSignInModal && (
        <SignInModal
          open={showSignInModal}
          toggleopen={() => setShowSignInModl((d) => !d)}
          width={500}
        />
      )}
    </>
  );
}
GridItem.propTypes = {
  item: PropTypes.any,
};
