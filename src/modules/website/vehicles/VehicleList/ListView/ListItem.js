import {Box, Divider, Stack, Button, useTheme, Chip} from '@mui/material';
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

const TextShow = ({value, label, extra = ''}) => {
  return (
    <Typography variant='body1'>
      <Box display='inline' fontWeight='bold' columnGap='5px'>
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
  const {addToWatchList, watchlistLoading, addedToWatchList} =
    useAddToWatchList(item, setShowSignInModl);

  const viewPage = () => {
    router.push(`/all-vehicles/${item.id}`);
  };
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
          <Typography
            p='8px'
            gutterBottom
            component='div'
            color={theme.palette.primary.main}
          >
            {item.year} {item.make} {item.model}
          </Typography>
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
            {item.status == 'sold' && (
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
                  alt={item.name}
                />
              </Box>
            )}
            <CardMedia
              component='img'
              image={
                item.images?.find((item) => item.type == 'main_image')?.path ??
                DefaultCarImage.src
              }
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
          <CardContent sx={{flex: {xs: 1, sm: 4, md: 4}}}>
            <Stack direction='row' spacing={0}>
              <Box sx={{flex: 2}}>
                <Box sx={{display: {xs: 'none', sm: 'block'}}}>
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
                  <Divider sx={{mb: 2}} />
                </Box>
                <Box>
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
                  <Typography
                    component='div'
                    color={theme.palette.primary.main}
                    overflow='hidden'
                    sx={{display: {sm: 'block', lg: 'none'}, fontSize: '14px'}}
                  >
                    {item.odometer_type}
                  </Typography>

                  <Box display='flex' columnGap='5px'>
                    <IntlMessages id='common.lot' />#
                    <Typography
                      color={theme.palette.primary.main}
                      display='inline'
                    >
                      {item.lot_number}
                    </Typography>
                  </Box>
                  <Box display='flex' columnGap='5px'>
                    <IntlMessages id='common.vin' />
                    <Typography
                      color={theme.palette.primary.main}
                      display='inline'
                    >
                      {item.vin}
                    </Typography>
                  </Box>
                  <Box display='flex' columnGap='5px'>
                    <IntlMessages id='common.location' />
                    <Typography
                      noWrap
                      gutterBottom
                      color={theme.palette.primary.main}
                    >
                      {item.location?.name}
                    </Typography>
                  </Box>
                </Box>
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
                <Box
                  sx={{
                    display: {xs: 'inline', sm: 'none'},
                  }}
                >
                  <WhatsAppButton
                    number={item.seller?.loginable?.whatsapp}
                    url={window.location.origin + '/all-vehicles/' + item.id}
                  />
                </Box>
              </Box>
              <Box sx={{flex: 1.5, display: {xs: 'none', lg: 'block'}, px: 3}}>
                <TextShow
                  label={<IntlMessages id='vehicle.odometer' />}
                  value={item.odometer_type}
                />
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
                <TextShow
                  label={<IntlMessages id='vehicle.exterior_color' />}
                  value={item.exterior_color}
                />
                <TextShow
                  label={<IntlMessages id='vehicle.interior_color' />}
                  value={item.interior_color}
                />
                <TextShow
                  label={<IntlMessages id='vehicle.keys' />}
                  value={item.keys ? 'Available' : 'Not Available'}
                />
              </Box>
              <Box sx={{flex: 1, display: {xs: 'none', sm: 'block'}, px: 2}}>
                {/* <Typography
                  component='div'
                  color={theme.palette.primary.main}
                  overflow='hidden'
                  mb='10px'
                  fontSize='20px'
                  fontWeight='bold'
                >
                  {moneyFormater(
                    parseInt(item.price) +
                      parseInt((item.price * item.sale_rate ?? 15) / 100),
                  )}
                </Typography> */}
                <WhatsAppButton
                  number={item.seller?.loginable?.whatsapp}
                  url={window.location.origin + '/all-vehicles/' + item.id}
                />
              </Box>
              {/* <Divider orientation='vertical' flexItem /> */}
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
  item: PropTypes.object.isRequired,
};

TextShow.propTypes = {
  value: PropTypes.string,
  label: PropTypes.string,
  extra: PropTypes.any,
};
WhatsAppButton.propTypes = {
  number: PropTypes.string,
  url: PropTypes.string,
};
