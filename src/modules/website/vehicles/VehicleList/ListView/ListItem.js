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
import {moneyFormater} from 'configs';
import {useRouter} from 'next/router';
import PropTypes from 'prop-types';
import {
  Box,
  Divider,
  Stack,
  Button,
  useTheme,
  Chip,
  Skeleton,
  Link,
} from '@mui/material';
import {useAuthUser} from '@crema/utility/AuthHooks';
import moment from 'moment';
import 'moment-timezone';
import MyTimer from 'components/design/timer';

const TextShow = ({value, label, extra = ''}) => {
  return (
    <Typography variant='body1'>
      <Box component='span' display='inline' fontWeight='bold' columnGap='5px'>
        {label}
      </Box>{' '}
      {value} {extra}
    </Typography>
  );
};

const WhatsAppButton = (props) => {
  return (
    <Button
      {...props}
      variant='contained'
      size='small'
      sx={{mt: 2, px: {xs: 2, md: 4}}}
      p='0px'
      href={`https://wa.me/${props.number}?text=${props.url}`}
      target='_blank'
    >
      <WhatsAppIcon />
      <Box pt='2px'>{props.number}</Box>
    </Button>
  );
};
export default function ListItem({item, ...props}) {
  const router = useRouter();
  const theme = useTheme();
  const [showSignInModal, setShowSignInModl] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const {addToWatchList, watchlistLoading, addedToWatchList} =
    useAddToWatchList(item, setShowSignInModl);

  const viewPage = () => {
    item?.id && item.auctions.length > 0
      ? router.push(`/auctions/auction_items/${item?.auctions[0].pivot.id}`)
      : router.push(`/all-vehicles/${item?.id}`);
  };

  const {user} = useAuthUser();
  const [isStarted, setIsStarted] = useState(false);

  let endTime = moment(
    item?.auctions[0]?.end_date,
    'YYYY-MM-DD hh:mm:ss A',
    user?.timezone ? user.timezone : 'UTC',
  )
    .tz(user?.timezone ? user.timezone : moment.tz.guess())
    .format('YYYY-MM-DD hh:mm:ss A');

  let startTime = moment(
    item?.auctions[0]?.start_date,
    'YYYY-MM-DD hh:mm:ss A',
    user?.timezone ? user.timezone : 'UTC',
  )
    .tz(user?.timezone ? user.timezone : moment.tz.guess())
    .format('YYYY-MM-DD hh:mm:ss A');

  useEffect(() => {
    setIsStarted(moment().isAfter(startTime));
  }, []);

  return (
    <>
      <Card
        sx={{
          borderRadius: 1,
          mb: 4,
          maxWidth: '100%',
        }}
      >
        <Box sx={{display: {xs: 'block', sm: 'none'}}}>
          {!item ? (
            <Typography p='8px' gutterBottom component='div'>
              <Skeleton animation='wave' />
            </Typography>
          ) : (
            <Typography
              p='8px'
              gutterBottom
              component='div'
              color={theme.palette.primary.main}
            >
              {item.year} {item.make} {item.model}
            </Typography>
          )}
          <Divider />
        </Box>
        <Box
          sx={{
            display: 'flex',
          }}
        >
          <Box
            overflow='hidden'
            sx={{
              display: 'flex',
              flex: {xs: 1, sm: 2, md: 2, lg: 1},
            }}
            minWidth='140px'
            onClick={() => viewPage()}
          >
            {item?.status == 'sold' && (
              <Box position='relative' zIndex='100'>
                <Box
                  sx={{
                    position: 'absolute',
                    top: 3,
                    left: 3,
                    transform: 'rotate(-40deg)',
                  }}
                  width='35px'
                  component='img'
                  src={SoldIcon.src}
                  alt={item?.name}
                />
              </Box>
            )}
            {(!imageLoaded || !item) && (
              <Skeleton
                variant='rectangular'
                animation='wave'
                width='100%'
                height='100%'
              />
            )}
            {item && (
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
                    flex: 1,
                    cursor: 'pointer',
                    transition: 'all 450ms ease-out',
                    '&:hover': {
                      transform: 'scale(1.2)',
                    },
                  }}
                />
              </Box>
            )}
          </Box>
          <CardContent sx={{flex: {xs: 1, sm: 4, md: 4}}}>
            <Stack direction='row' spacing={0}>
              <Box sx={{flex: 2}}>
                <Box sx={{display: {xs: 'none', sm: 'block'}}}>
                  {!item ? (
                    <Typography gutterBottom variant='h4' component='div'>
                      <Skeleton animation='wave' />
                    </Typography>
                  ) : (
                    <Box sx={{display: 'flex'}}>
                      <AppTooltip
                        title={`${item.year} ${item.make} ${item.model}`}
                      >
                        <Typography
                          gutterBottom
                          variant='h4'
                          color={theme.palette.primary.main}
                          component='div'
                          overflow='hidden'
                          sx={{
                            fontSize: {xs: '14px', sm: '16px'},
                            cursor: 'pointer',
                          }}
                          onClick={() => viewPage()}
                        >
                          {item.year} {item.make} {item.model}
                        </Typography>
                      </AppTooltip>
                    </Box>
                  )}
                  <Divider sx={{mb: 2}} />
                </Box>
                <Box>
                  {!item ? (
                    <Chip
                      sx={{width: 80, float: 'right', ml: 4}}
                      size='small'
                      label={<Skeleton animation='wave' variant='rounded' />}
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
                      label={
                        item.status == 'future'
                          ? 'on the way'
                          : item?.auctions.length > 0
                          ? isStarted
                            ? 'auction in progress'
                            : 'upcoming auction'
                          : item.status
                      }
                      size='small'
                    />
                  )}
                  {/* <Typography
                    component='div'
                    color={theme.palette.primary.main}
                    overflow='hidden'
                    fontSize='16px'
                    fontWeight='bold'
                    sx={{display: {xs: 'block', sm: 'none'}, fontSize: '14px'}}
                  >
                    {moneyFormater(
                      parseInt(item.price) +
                        parseInt((item.price * item.sale_rate ?? 15) / 100),
                    )}
                  </Typography> */}
                  {item && (
                    <Typography
                      component='div'
                      color={theme.palette.primary.main}
                      overflow='hidden'
                      sx={{
                        display: {sm: 'block', lg: 'none'},
                        fontSize: '14px',
                      }}
                    >
                      {item.odometer_type}
                    </Typography>
                  )}

                  <Box display='flex' columnGap='5px'>
                    <IntlMessages id='common.lot' />#
                    {!item ? (
                      <Typography sx={{flex: 1}}>
                        <Skeleton animation='wave' />
                      </Typography>
                    ) : (
                      <Typography
                        sx={{color: (theme) => theme.palette.primary.main}}
                        display='inline'
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
                        display='inline'
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
                        sx={{color: (theme) => theme.palette.primary.main}}
                        noWrap
                        gutterBottom
                      >
                        {item.location?.name}
                      </Typography>
                    )}
                  </Box>
                </Box>
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
                  <Button
                    size='small'
                    sx={{mt: 2, display: {xs: 'inline', sm: 'none'}}}
                  >
                    <Skeleton animation='wave' sx={{width: 100, py: 3}} />
                  </Button>
                ) : (
                  <Box
                    sx={{
                      display: {xs: 'inline', sm: 'none'},
                    }}
                  >
                    <WhatsAppButton
                      // number={item.seller?.loginable?.whatsapp}
                      number={'whatsapp number'}
                      url={window.location.origin + '/all-vehicles/' + item.id}
                    />
                  </Box>
                )}
              </Box>
              <Box sx={{flex: 1.5, display: {xs: 'none', lg: 'block'}, px: 3}}>
                {!item ? (
                  <Typography variant='body1'>
                    <Box display='inline' fontWeight='bold' columnGap='5px'>
                      <Skeleton animation='wave' />
                    </Box>
                  </Typography>
                ) : (
                  <TextShow
                    label={<IntlMessages id='vehicle.odometer' />}
                    value={item.odometer_type}
                  />
                )}
                {!item ? (
                  <Typography variant='body1'>
                    <Box display='inline' fontWeight='bold' columnGap='5px'>
                      <Skeleton animation='wave' />
                    </Box>
                  </Typography>
                ) : (
                  <TextShow
                    label={<IntlMessages id='vehicle.test_drive' />}
                    value={
                      item.test_drive ? (
                        <IntlMessages id='common.yes' />
                      ) : (
                        <IntlMessages id='common.no' />
                      )
                    }
                  />
                )}
                {!item ? (
                  <Typography variant='body1'>
                    <Box display='inline' fontWeight='bold' columnGap='5px'>
                      <Skeleton animation='wave' />
                    </Box>
                  </Typography>
                ) : (
                  <TextShow
                    label={<IntlMessages id='vehicle.exterior_color' />}
                    value={item.exterior_color}
                  />
                )}
                {!item ? (
                  <Typography variant='body1'>
                    <Box display='inline' fontWeight='bold' columnGap='5px'>
                      <Skeleton animation='wave' />
                    </Box>
                  </Typography>
                ) : (
                  <TextShow
                    label={<IntlMessages id='vehicle.interior_color' />}
                    value={item.interior_color}
                  />
                )}
                {!item ? (
                  <Typography variant='body1'>
                    <Box display='inline' fontWeight='bold' columnGap='5px'>
                      <Skeleton animation='wave' />
                    </Box>
                  </Typography>
                ) : (
                  <TextShow
                    label={<IntlMessages id='vehicle.keys' />}
                    value={item.keys ? 'Available' : 'Not Available'}
                  />
                )}
              </Box>
              {!item ? (
                <Box sx={{flex: 1, display: {xs: 'none', sm: 'block'}, px: 2}}>
                  <Skeleton animation='wave' sx={{py: 3}} />
                </Box>
              ) : item.auctions.length > 0 ? (
                <Box sx={{flex: 1, display: {xs: 'none', sm: 'block'}, px: 2}}>
                  <Button
                    onClick={() =>
                      router.push(
                        `/auctions/auction_items/${item?.auctions[0].pivot.id}`,
                      )
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

                  <Box sx={{mt: 2}}>
                    {isStarted && (
                      <>
                        <IntlMessages id='common.endDate' />
                        <MyTimer
                          color='red'
                          expiryTimestamp={moment(
                            item?.auctions[0]?.end_date,
                            'YYYY-MM-DD hh:mm:ss A',
                            user?.timezone ? user.timezone : 'UTC',
                          ).tz('UTC')}
                          onExpire={() => {
                            onExpire(item?.id);
                          }}
                        />
                      </>
                    )}
                    {!isStarted && (
                      <>
                        <IntlMessages id='common.startDate' />
                        <MyTimer
                          color='primary'
                          expiryTimestamp={moment(
                            item?.auctions[0]?.start_date,
                            'YYYY-MM-DD hh:mm:ss A',
                            user?.timezone ? user.timezone : 'UTC',
                          ).tz('UTC')}
                          onExpire={() => {
                            setIsStarted(true);
                          }}
                        />
                      </>
                    )}
                  </Box>
                  <Box sx={{mt: 2}}>
                    <Link
                      variant='body2'
                      fontSize='14px'
                      underline='none'
                      href=''
                      mx='2px'
                      target='_blank'
                    >
                      {'Buy now price' +
                        ': ' +
                        item?.auctions[0]?.pivot?.buy_now_price}
                    </Link>
                  </Box>
                </Box>
              ) : (
                <Box sx={{flex: 1, display: {xs: 'none', sm: 'block'}, px: 2}}>
                  <WhatsAppButton
                    number={'whatsapp number'}
                    // number={item.seller?.loginable?.whatsapp}
                    url={window.location.origin + '/all-vehicles/' + item.id}
                  />
                </Box>
              )}
            </Stack>
          </CardContent>
        </Box>
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
ListItem.propTypes = {
  item: PropTypes.object,
};

TextShow.propTypes = {
  value: PropTypes.any,
  label: PropTypes.any,
  extra: PropTypes.any,
};
WhatsAppButton.propTypes = {
  number: PropTypes.string,
  url: PropTypes.string,
};
