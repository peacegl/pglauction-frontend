import {
  Box,
  Container,
  Drawer,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import {useRouter} from 'next/router';
import {useTheme} from '@mui/styles';
import MenuIcon from '@mui/icons-material/Menu';
import {useState} from 'react';
import {pages} from './AppBar';
import FacebookIcon from '../../assets/icon/facebook.svg';
import WhatsAppIcon from '../../assets/icon/whatsapp.svg';
import InstagramIcon from '../../assets/icon/instagram.svg';
import VehicleSearchBar from './VehicleSearchBar';
import {useDispatch, useSelector} from 'react-redux';
import {setVehicleSearch} from '../../redux/actions';
import logoImage from '../../assets/united_logo.png';

function Header() {
  const router = useRouter();
  const theme = useTheme();
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setIsMenuOpen(open);
  };

  const {search = ''} = useSelector(({webVehicles}) => webVehicles);

  const onSearch = (value) => {
    router.push('/all-vehicles');
    dispatch(setVehicleSearch(value));
  };

  const listMenu = (
    <Box
      sx={{width: 250}}
      role='presentation'
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {pages.map((item, index) => (
          <ListItem key={item.title} disablePadding>
            <ListItemButton onClick={() => router.push(item.link)}>
              <ListItemText
                primary={item.title}
                sx={{color: (theme) => theme.palette.text.primary}}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
  return (
    <Box
      display='flex'
      alignItems='center'
      width='100%'
      position='static'
      zIndex='1'
      style={{
        width: '100%',
        backgroundColor: 'white',
      }}
      sx={{height: {xs: '70px', md: '80px'}}}
    >
      <Container maxWidth='xl'>
        <Box
          margin='auto'
          display='flex'
          justifyContent='space-between'
          alignItems='center'
          columnGap='20px'
        >
          <Box
            onClick={() => router.push('/home')}
            sx={{
              '&:hover': {cursor: 'pointer'},
              color: (theme) => theme.palette.text.primary,
            }}
            fontWeight='bold'
            fontSize='18px'
            display='flex'
            alignItems='center'
          >
            <Box
              component='img'
              sx={{
                width: {xs: '100px', md: '120px', lg: '140px', xl: '160px'},
              }}
              alt='united logo'
              src={logoImage.src}
            />
            <Typography
              component='h1'
              sx={{
                display: {xs: 'none', sm: 'inline'},
                fontSize: {xs: '17px', lg: '22px'},
                fontWeight: 'bold',
              }}
            >
              United Trading Company
            </Typography>
          </Box>

          <Box sx={{display: {xs: 'none', md: 'flex'}}}>
            <VehicleSearchBar
              placeholder='Search Inventory By Make, Model, Vin, and More...'
              onEnter={onSearch}
              onSearch={onSearch}
              defaultValue={search}
            />
          </Box>
          <Box
            display='flex'
            justifyContent='space-between'
            alignItems='center'
            sx={{columnGap: {xs: '2px', sm: '5px', md: '8px'}}}
            zIndex='2'
          >
            <Link
              variant='body2'
              fontSize='14px'
              underline='none'
              href='https://www.facebook.com/TowingLoadingShipping'
              mx='5px'
              color={(theme) => theme.palette.text.secondary}
              target='_blank'
            >
              <FacebookIcon width='30' />
            </Link>
            <Link
              variant='body2'
              fontSize='14px'
              underline='none'
              href='https://wa.me/+937669086'
              mx='5px'
              color={(theme) => theme.palette.text.secondary}
              target='_blank'
            >
              <WhatsAppIcon width='30' />
            </Link>
          </Box>
          <Box
            display='flex'
            justifyContent='space-between'
            alignItems='center'
            sx={{
              columnGap: {xs: '2px', sm: '5px', md: '8px'},
              display: {xs: 'block', md: 'none'},
            }}
            zIndex='2'
          >
            <IconButton
              sx={{color: (theme) => theme.palette.text.primary}}
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor='right'
              open={isMenuOpen}
              onClose={toggleDrawer(false)}
            >
              {listMenu}
            </Drawer>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Header;
