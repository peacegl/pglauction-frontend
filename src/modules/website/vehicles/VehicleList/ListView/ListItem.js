import {
  Box,
  Divider,
  Stack,
  Button,
  ButtonBase,
  CardHeader,
} from '@mui/material';
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
import {useRouter} from 'next/router';

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
      sx={{mt: 2, px: {xs: 0, sm: 3, md: 4}}}
      p='0px'
      href={`https://wa.me/${props.number}`}
      target='_blank'
    >
      <WhatsAppIcon />
      <Box pt='2px' sx={{display: {xs: 'none', sm: 'inline'}}}>
        {props.number}
      </Box>
    </Button>
  );
};
export default function ListItem(props) {
  const router = useRouter();

  const viewPage = () => {
    router.push(`/all-vehicles/${props.item.id}`);
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
          <Typography p='8px' gutterBottom component='div' color='primary'>
            {props.item.year} {props.item?.model.make?.name}{' '}
            {props.item.model?.name}
          </Typography>
          <Divider sx={{mb: 2}} />
        </Box>
        <Box
          sx={{
            borderRadius: 1,
            display: 'flex',
            flexDirection: {xs: 'row', sm: 'row'},
            alignItems: 'center',
            mb: 3,
            maxWidth: '100%',
          }}
        >
          <Box sx={{width: {xs: '180px', sm: '210px'}}} overflow='hidden'>
            <CardMedia
              onClick={() => viewPage()}
              component='img'
              image={
                props.item.images.find((item) => item.type == 'main_image').path
              }
              alt='preview'
              sx={{
                cursor: 'pointer',
                height: {xs: '130px', sm: '160px'},
                transition: 'all 450ms ease-out',
                '&:hover': {
                  transform: 'scale(1.2)',
                },
              }}
            />
          </Box>
          <CardContent sx={{width: '100%'}}>
            <Stack direction='row' spacing={0}>
              <Box sx={{flex: 2}}>
                <Box sx={{display: {xs: 'none', sm: 'block'}}}>
                  <AppTooltip
                    title={`${props.item?.year} ${props.item?.model.make?.name} 
                  ${props.item.model?.name}`}
                  >
                    <Typography
                      gutterBottom
                      component='div'
                      color='primary'
                      variant='h4'
                      overflow='hidden'
                      height='20px'
                      sx={{
                        fontSize: {xs: '14px', sm: '16px'},
                        cursor: 'pointer',
                      }}
                      onClick={() => viewPage()}
                    >
                      {props.item.year} {props.item?.model.make?.name}{' '}
                      {props.item.model?.name}
                    </Typography>
                  </AppTooltip>
                  <Divider sx={{my: 2}} />
                </Box>
                <Box>
                  <Box>
                    <Typography color='text.secondary' display='inline'>
                      Lot#
                    </Typography>
                    <Typography
                      color='primary'
                      display='inline'
                      sx={{cursor: 'pointer'}}
                      onClick={() => viewPage()}
                    >
                      {props.item.lot_number}
                    </Typography>
                  </Box>
                  <Typography
                    component='div'
                    color='primary'
                    overflow='hidden'
                    sx={{display: {sm: 'block', md: 'none'}, fontSize: '14px'}}
                  >
                    {props.item.odometer} Miles
                  </Typography>
                  <Typography
                    component='div'
                    color='primary'
                    overflow='hidden'
                    mb='10px'
                    fontSize='16px'
                    fontWeight='bold'
                    sx={{display: {xs: 'block', sm: 'none'}, fontSize: '14px'}}
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
                sx={{flex: 1.5, display: {xs: 'none', md: 'block'}, px: 3}}
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
                <TextShow
                  label='Body Style'
                  value={props.item.interior_color}
                />
                <TextShow
                  label='Keys'
                  value={props.item.keys ? 'Available' : 'Not Available'}
                />
              </Box>
              <Box sx={{flex: 1, display: {xs: 'none', sm: 'block'}, px: 2}}>
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
        </Box>
      </Card>
    </>
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
