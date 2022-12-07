import {
  Box,
  Divider,
  Stack,
  Button,
  ButtonBase,
  CardHeader,
  useTheme,
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
import IntlMessages from '@crema/utility/IntlMessages';

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
      sx={{mt: 2, px: {xs: 2, md: 4}}}
      p='0px'
      href={`https://wa.me/${props.number}`}
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
            {item.year} {item.model.make?.name}
            {item.model?.name}
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
          >
            <CardMedia
              onClick={() => viewPage()}
              component='img'
              image={item.images.find((item) => item.type == 'main_image').path}
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
                  <AppTooltip
                    title={`${item?.year} ${item?.model?.make?.name} ${item.model?.name}`}
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
                      {item?.year} {item.model?.make?.name} {item?.model?.name}
                    </Typography>
                  </AppTooltip>
                  <Divider sx={{my: 2}} />
                </Box>
                <Box>
                  <Typography
                    component='div'
                    color={theme.palette.primary.main}
                    overflow='hidden'
                    fontSize='16px'
                    fontWeight='bold'
                    sx={{display: {xs: 'block', sm: 'none'}, fontSize: '14px'}}
                  >
                    {moneyFormater(item.price)}
                  </Typography>
                  <Typography
                    component='div'
                    color={theme.palette.primary.main}
                    overflow='hidden'
                    sx={{display: {sm: 'block', md: 'none'}, fontSize: '14px'}}
                  >
                    {item.odometer} <IntlMessages id='common.miles' />
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
                      color={theme.palette.primary.main}
                      display='inline'
                    >
                      {item.location?.name}
                    </Typography>
                  </Box>
                </Box>
                {/* <Button
                  variant='outlined'
                  borderRadius='28'
                  size='small'
                  sx={{mt: 2, px: 2}}
                  href=''
                >
                  <BookmarkAddIcon />
                  Watch
                </Button> */}
                <Box
                  sx={{
                    display: {xs: 'inline', sm: 'none'},
                  }}
                >
                  <WhatsAppButton number='+435345345342' />
                </Box>
              </Box>
              <Box
                sx={{flex: 1.5, display: {xs: 'none', lg: 'block'}, px: 3}}
                color='text.secondary'
              >
                <TextShow label='Odometer' value={item.odometer} />
                <TextShow label='Interior Color' value={item.interior_color} />
                <TextShow label='Exterior Color' value={item.exterior_color} />
                <TextShow label='Body Style' value={item.interior_color} />
                <TextShow
                  label='Keys'
                  value={item.keys ? 'Available' : 'Not Available'}
                />
              </Box>
              <Box sx={{flex: 1, display: {xs: 'none', sm: 'block'}, px: 2}}>
                <Typography
                  component='div'
                  color={theme.palette.primary.main}
                  overflow='hidden'
                  mb='10px'
                  fontSize='20px'
                  fontWeight='bold'
                >
                  {moneyFormater(item.price)}
                </Typography>
                {/* <Typography component='div' color={theme.palette.primary.main} overflow='hidden'>
              <Box fontWeight='bold' display='inline'>
                Sale Date
              </Box>{' '}
              {item.date}
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
