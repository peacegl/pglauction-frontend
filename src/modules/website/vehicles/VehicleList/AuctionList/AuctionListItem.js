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
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import {LabelOffOutlined} from '@mui/icons-material';

const TextShow = ({value, label}) => {
  return (
    <Typography>
      <Box fontWeight='bold' display='inline'>
        {label} {value}
      </Box>
    </Typography>
  );
};
export default function AuctionListItem(props) {
  return (
    <Card
      sx={{
        borderRadius: 1,
        display: 'flex',
        flexDirection: {xs: 'column', sm: 'row'},
        alignItems: 'center',
        mb: 4,
        maxWidth: {xs: '360px', sm: '100%'},
      }}
    >
      <Box width='210px' overflow='hidden'>
        <CardMedia
          component='img'
          height='160'
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
          <Box sx={{flex: 2}}>
            <AppTooltip
              title={`${props.item?.model.make?.name} 
            ${props.item.model?.name}
            ${props.item?.year}`}
            >
              <Typography
                gutterBottom
                variant='h4'
                component='div'
                color='primary'
                overflow='hidden'
              >
                {props.item.year} {props.item?.model.make?.name}{' '}
                {props.item.model?.name}
              </Typography>
            </AppTooltip>
            <Divider sx={{my: 2}} />
            <Box>
              <Typography color='text.secondary' display='inline'>
                Lot#
              </Typography>
              <Typography color='primary' display='inline'>
                {props.item.lot_number}
              </Typography>
            </Box>
            <Button
              variant='outlined'
              borderRadius='28'
              size='small'
              sx={{mt: 2, px: 3}}
              href=''
            >
              <BookmarkAddIcon />
              Watch
            </Button>
          </Box>
          <Box sx={{flex: 1}} color='text.secondary'>
            <TextShow label='Odometer' value={props.item.odometer} />
            <TextShow
              label='Interior Color'
              value={props.item.interior_color}
            />
            <TextShow
              label='Exterior Color'
              value={props.item.exterior_color}
            />
            <TextShow label='Body Style' value={props.item.interior_color} />
            <TextShow
              label='Keys'
              value={props.item.keys ? 'Available' : 'Not Available'}
            />
          </Box>
          <Box sx={{flex: 1}}>
            <Typography
              component='div'
              color='primary'
              overflow='hidden'
              mb='15px'
            >
              <Box fontWeight='bold' display='inline'>
                Price
              </Box>{' '}
              AED {props.item.price}
            </Typography>
            {/* <Typography component='div' color='primary' overflow='hidden'>
              <Box fontWeight='bold' display='inline'>
                Sale Date
              </Box>{' '}
              {props.item.date}
            </Typography> */}

            <Button
              variant='contained'
              size='small'
              sx={{mt: 3, px: 4}}
              href={`https://wa.me/+93988668866`}
              target='_blank'
            >
              <WhatsAppIcon sx={{mx: 2}} />
              +93988668866
            </Button>
          </Box>
          {/* <Divider orientation='vertical' flexItem /> */}
        </Stack>
      </CardContent>
    </Card>
  );
}
AuctionListItem.propTypes = {
  item: PropTypes.object.isRequired,
};

TextShow.propTypes = {
  value: PropTypes.string,
  label: PropTypes.string,
};
