import {Box, Divider, Button, useTheme, Chip, Skeleton} from '@mui/material';
import DefaultCarImage from 'assets/default_car_image.png';
import SoldIcon from '../../../../../assets/icon/sold.png';
import SignInModal from 'modules/auth/Signin/SignInModal';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import IntlMessages from '@crema/utility/IntlMessages';
import {useAuthUser} from '@crema/utility/AuthHooks';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import AppTooltip from '@crema/core/AppTooltip';
import {useEffect, useState} from 'react';
import { moneyFormater} from 'configs';
import Card from '@mui/material/Card';
import {useRouter} from 'next/router';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'moment-timezone';

export default function GridItem({item, ...props}) {
  const router = useRouter();
  const {user} = useAuthUser();
  const [hoverImage, setHoverImage] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showSignInModal, setShowSignInModl] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  let startTime = moment(
    item?.start_date,
    'YYYY-MM-DD HH:mm:ss',
    user?.timezone ? user.timezone : 'UTC',
  )
    .tz(user?.timezone ? user.timezone : moment.tz.guess())
    .format('YYYY-MM-DD hh:mm:ss A');

  useEffect(() => {
    setIsStarted(moment().isAfter(startTime));
  }, []);
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
            onClick={() =>
              router.push(`/auctions/auction_items/${item.item_id}`)
            }
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
                  alt={'company Name'}
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
                  onClick={() =>
                    router.push(`/auctions/auction_items/${item.item_id}`)
                  }
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
          <Box sx={{mt: 1}}>
            <>
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
              <Box display='flex' columnGap='5px'>
                <IntlMessages id='auction.startingBid' />
                {!item ? (
                  <Typography sx={{flex: 1, fontWeight: 'bold'}}>
                    <Skeleton animation='wave' />
                  </Typography>
                ) : (
                  <Typography
                    noWrap
                    gutterBottom
                    sx={{
                      color: (theme) => theme.palette.primary.main,
                      fontWeight: 'bold',
                    }}
                  >
                    {moneyFormater(parseInt(item?.minimum_bid),item.currency)}
                  </Typography>
                )}
              </Box>
              <Box display='flex' columnGap='5px'>
                <IntlMessages id='vehicle.buyNowPrice' />
                {!item ? (
                  <Typography sx={{flex: 1, fontWeight: 'bold'}}>
                    <Skeleton animation='wave' />
                  </Typography>
                ) : (
                  <Typography
                    noWrap
                    gutterBottom
                    sx={{
                      color: (theme) => theme.palette.primary.main,
                      fontWeight: 'bold',
                    }}
                  >
                    {moneyFormater(parseInt(item?.buy_now_price),item.currency)}
                  </Typography>
                )}
              </Box>
            </>
          </Box>
          {item?.status != 'sold' ? (
            <Box
              display='flex'
              justifyContent='space-between'
              alignItems='center'
              sx={{flexWrap: 'wrap'}}
            >
              {!item ? (
                <Button size='small' sx={{mt: 2}}>
                  <Skeleton animation='wave' sx={{height: '38.75px'}} />
                </Button>
              ) : (
                <Button
                  onClick={() =>
                    router.push(`/auctions/auction_items/${item.item_id}`)
                  }
                  variant='contained'
                  size='small'
                  sx={{mt: 2, color: 'white'}}
                >
                  {isStarted ? (
                    <IntlMessages id='auction.bidNow' />
                  ) : (
                    <IntlMessages id='auction.preBid' />
                  )}
                </Button>
              )}
              {!item ? (
                <Button size='small' sx={{mt: 2}}>
                  <Skeleton animation='wave' sx={{width: 100, py: 3}} />
                </Button>
              ) : (
                <Button
                  onClick={(e) => e.stopPropagation()}
                  variant='contained'
                  color='success'
                  size='small'
                  sx={{mt: 2}}
                  href={`https://wa.me/${item?.seller?.loginable?.whatsapp}?text=${window.location.origin}/auctions/auction_items/${item?.item_id}`}
                  target='_blank'
                >
                  <WhatsAppIcon sx={{color: 'white'}} />
                </Button>
              )}
            </Box>
          ) : (
            <Box sx={{height: '38.75px'}}></Box>
          )}
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
