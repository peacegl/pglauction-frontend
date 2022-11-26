import {Box, Divider, Stack, Button} from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import Card from '@mui/material/Card';
import PropTypes from 'prop-types';
import Link from 'next/link';
import AppTooltip from '@crema/core/AppTooltip';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import {moneyFormater} from 'configs';

const TextShow = ({value, label}) => {
  return (
    <Typography variant='body1'>
      <Box display='inline' fontWeight='bold'>
        {label}
      </Box>{' '}
      {value}
    </Typography>
  );
};

const WhatsAppButton = (props) => {
  return (
    <Button
      {...props}
      variant='contained'
      size='small'
      sx={{mt: 2, px: {md: 4, sm: 3}, borderRadius: '20px'}}
      href={`https://wa.me/${props.number}`}
      target='_blank'
    >
      <WhatsAppIcon />
      <Box pt='2px'>{props.number}</Box>
    </Button>
  );
};
export default function ListItem(props) {
  return (
    <Card
      sx={{
        borderRadius: 1,
        display: 'flex',
        flexDirection: {xs: 'row', sm: 'row'},
        alignItems: 'center',
        mb: 4,
        maxWidth: '100%',
      }}
    >
      <Box sx={{width: {xs: '160px', sm: '210px'}}} overflow='hidden'>
        <CardMedia
          component='img'
          image={
            props.item.images.find((item) => item.type == 'main_image').path
          }
          alt='preview'
          sx={{
            height: {xs: '100px', sm: '160px'},
            transition: 'all 450ms ease-out',
            '&:hover': {
              transform: 'scale(1.2)',
            },
          }}
        />
      </Box>
      <CardContent sx={{width: '100%'}}>
        <Stack direction='row' spacing={5}>
          <Box sx={{flex: 2}}>
            <AppTooltip
              title={`${props.item?.year} ${props.item?.model.make?.name} 
            ${props.item.model?.name}`}
            >
              <Typography
                gutterBottom
                variant='h4'
                component='div'
                color='primary'
                overflow='hidden'
                height='20px'
              >
                {props.item.year} {props.item?.model.make?.name}{' '}
                {props.item.model?.name}
              </Typography>
            </AppTooltip>
            <Divider sx={{my: 2}} />
            <Box display='flex' justifyContent='space-between'>
              <Box>
                <Typography color='text.secondary' display='inline'>
                  Lot#
                </Typography>
                <Typography color='primary' display='inline'>
                  {props.item.lot_number}
                </Typography>
              </Box>
              <Typography
                component='div'
                color='primary'
                overflow='hidden'
                mb='10px'
                fontSize='16px'
                fontWeight='bold'
                sx={{display: {xs: 'block', sm: 'none'}}}
              >
                {moneyFormater(props.item.price)}
              </Typography>
            </Box>
            <Button
              variant='outlined'
              borderRadius='28'
              size='small'
              sx={{mt: 2, px: 2}}
              href=''
            >
              <BookmarkAddIcon />
              Watch
            </Button>
            <Box
              sx={{
                display: {xs: 'inline', sm: 'none'},
                mx: 2,
              }}
            >
              <WhatsAppButton number='+435345345342' />
            </Box>
          </Box>
          <Box
            sx={{flex: 1, display: {xs: 'none', md: 'block'}}}
            color='text.secondary'
          >
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
          <Box sx={{flex: 1, display: {xs: 'none', sm: 'block'}}}>
            <Typography
              component='div'
              color='primary'
              overflow='hidden'
              mb='10px'
              fontSize='20px'
              fontWeight='bold'
            >
              {moneyFormater(props.item.price)}
            </Typography>
            {/* <Typography component='div' color='primary' overflow='hidden'>
              <Box fontWeight='bold' display='inline'>
                Sale Date
              </Box>{' '}
              {props.item.date}
            </Typography> */}

            <WhatsAppButton number='+435345345342' />
          </Box>
          {/* <Divider orientation='vertical' flexItem /> */}
        </Stack>
      </CardContent>
    </Card>
  );
}
ListItem.propTypes = {
  item: PropTypes.object.isRequired,
};

TextShow.propTypes = {
  value: PropTypes.string,
  label: PropTypes.string,
};
WhatsAppButton.propTypes = {
  number: PropTypes.string,
};
