import {Box, Divider, Stack, Button} from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import IntlMessages from '@crema/utility/IntlMessages';
import CardContent from '@mui/material/CardContent';
import TimeRemainingBox from '../TimeRemainingBox';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import Card from '@mui/material/Card';
import PropTypes from 'prop-types';
import Link from 'next/link';
import AppTooltip from '@crema/core/AppTooltip';

export default function AuctionListItem(props) {
  return (
    <Card
      sx={{
        borderRadius: 1,
        display: 'flex',
        flexDirection: {xs: 'column', sm: 'row'},
        mb: 4,
        maxWidth: {xs: '360px', sm: '100%'},
      }}
    >
      <Box width='265px' overflow='hidden'>
        <CardMedia
          component='img'
          height='200'
          image={
            props.item.images.find((item) => item.type == 'main_image').path
          }
          alt='preview'
          sx={{
            transition: 'all 450ms ease-out',
            '&:hover': {
              transform: 'scale(1.2)',
            },
          }}
        />
      </Box>
      <CardContent sx={{width: '100%'}}>
        <Stack direction={{xs: 'column', sm: 'row'}} spacing={5}>
          <Box sx={{flex: 1}}>
            <AppTooltip
              title={`${props.item?.model.make?.name} 
            ${props.item.model?.name}
            ${props.item?.year}`}
            >
              <Typography
                height='20px'
                gutterBottom
                variant='h4'
                component='div'
                color='primary'
                overflow='hidden'
              >
                {props.item?.model.make?.name} {props.item.model?.name}{' '}
                {props.item.year}
              </Typography>
            </AppTooltip>
            <Typography
              gutterBottom
              variant='h3'
              component='div'
              color='primary'
            >
              {props.item.title}
            </Typography>
            <Divider sx={{my: 2}} />
            <Box
              color='text.secondary'
              sx={{
                display: 'flex',
                alignSelf: 'flex-end',
              }}
            >
              <Box sx={{flex: 1}}>
                <Box sx={{fontSize: '12px', textTransform: 'uppercase'}}>
                  <IntlMessages id='bid.currentBid' />
                </Box>
                <Box
                  sx={{
                    mt: 3,
                    color: (theme) => theme.palette.success.main,
                  }}
                >
                  $
                  <Box
                    display='inline'
                    sx={{
                      fontWeight: 'bold',
                    }}
                  >
                    {props.item.bids_max_amount}l
                  </Box>
                </Box>
              </Box>
              <Box sx={{flex: 1}}>
                <Box sx={{fontSize: '12px', textTransform: 'uppercase'}}>
                  <IntlMessages id='bid.timeRemaining' />
                </Box>
                <TimeRemainingBox end_date={props.item.end_date} />
              </Box>
            </Box>
            <Button
              variant='contained'
              size='small'
              sx={{mt: 2, px: 4}}
              href={`https://wa.me/+93988668866`}
              target='_blank'
            >
              <WhatsAppIcon sx={{mx: 2}} />
              +93988668866
            </Button>
          </Box>
          <Divider orientation='vertical' flexItem />
          <Box
            sx={{
              flex: 1,
              alignSelf: 'center',
              // display: {xs: 'none', md: 'row'},
            }}
          >
            <Typography variant='body1' color='text.secondary' sx={{mb: 2}}>
              <span style={{fontWeight: 'bold'}}>
                <IntlMessages id='bid.minimum_bid' />:
              </span>{' '}
              <Box
                sx={{
                  mt: 3,
                  display: 'inline',
                  color: (theme) => theme.palette.success.main,
                }}
              >
                $
                <span
                  display='inline'
                  style={{
                    fontWeight: 'bold',
                  }}
                >
                  {props.item.minimum_bid}
                </span>
              </Box>
            </Typography>
            <Typography variant='body1' color='text.secondary' sx={{mb: 2}}>
              <span style={{fontWeight: 'bold'}}>
                <IntlMessages id='bid.buy_now_price' />:
              </span>{' '}
              <Box
                sx={{
                  mt: 3,
                  display: 'inline',
                  color: (theme) => theme.palette.success.main,
                }}
              >
                $
                <span
                  display='inline'
                  style={{
                    fontWeight: 'bold',
                  }}
                >
                  {props.item.buy_now_price}
                </span>
              </Box>
            </Typography>
            <Typography variant='body1' color='text.secondary' sx={{mb: 2}}>
              <span style={{fontWeight: 'bold'}}>
                <IntlMessages id='common.note' />:
              </span>{' '}
              {props.item.note}
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}
AuctionListItem.propTypes = {
  item: PropTypes.object.isRequired,
};
