import InstagramIcon from '../../assets/icon/instagram.svg';
import WhatsAppIcon from '../../assets/icon/whatsapp.svg';
import FacebookIcon from '../../assets/icon/facebook.svg';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import {useDispatch, useSelector} from 'react-redux';
import VehicleSearchBar from './VehicleSearchBar';
import TiktokIcon from 'assets/icon/tiktok.png';
import MenuIcon from '@mui/icons-material/Menu';
import {setVehicleSearch} from 'redux/actions';
import logoImage from 'assets/united_logo.png';
import {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {useTheme} from '@mui/styles';
import {pages} from 'configs';
import Link from 'next/link';
import {
  alpha,
  Box,
  Collapse,
  Container,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';

function Header() {
  const router = useRouter();
  const theme = useTheme();
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [open, setOpen] = useState(true);
  const [active, setActive] = useState(true);

  useEffect(() => {
    pages.forEach((item, index) => {
      if (item.key == 8) {
        setActive(index);
      } else if (router.asPath == item.link) {
        setActive(index);
      }
    });
  }, [router?.asPath]);

  const handleClick = () => {
    setOpen(!open);
  };
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
    router.push('/');
    dispatch(setVehicleSearch(value));
  };

  const listMenu = (
    <Box
      sx={{width: 250}}
      role='presentation'
      // onKeyDown={toggleDrawer(false)}
    >
      <List>
        {pages.map((item, index) => (
          <ListItem key={index} disablePadding>
            {item.children ? (
              <Box sx={{width: '100%'}}>
                <ListItemButton onClick={handleClick}>
                  {/* <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon> */}
                  <ListItemText
                    primary={item.title}
                    sx={{
                      color: (theme) => theme.palette.text.primary,
                    }}
                  />
                  {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={open} timeout='auto' unmountOnExit>
                  <List component='div' disablePadding>
                    {item.children.map((child, i) => (
                      <ListItemButton
                        sx={{
                          px: 4,
                          bgcolor: (theme) =>
                            router.asPath == child.link &&
                            alpha(
                              theme.palette.primary.main,
                              theme.palette.action.selectedOpacity,
                            ),
                        }}
                        key={i}
                        onClick={() => {
                          router.push(child.link);
                          toggleDrawer(false);
                        }}
                      >
                        <ListItemIcon>{child.icon}</ListItemIcon>
                        <ListItemText
                          primary={child.title}
                          sx={{color: (theme) => theme.palette.text.primary}}
                        />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              </Box>
            ) : (
              <ListItemButton
                onClick={() => {
                  toggleDrawer(false);
                }}
                sx={{
                  bgcolor: (theme) =>
                    index == active &&
                    alpha(
                      theme.palette.primary.main,
                      theme.palette.action.selectedOpacity,
                    ),
                }}
              >
                <Link
                  href={item.link}
                  target={item.target}
                  style={{
                    width: '100%',
                    color: 'white',
                    alignItems: 'center',
                    textDecoration: 'none',
                  }}
                >
                  <ListItemText
                    primary={item.title}
                    sx={{
                      color: (theme) => theme.palette.text.primary,
                    }}
                  />
                </Link>
              </ListItemButton>
            )}
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
              United Used Cars
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
              href='https://www.tiktok.com/@united.used.car.llc'
              mx='2px'
              target='_blank'
            >
              <Box
                component='img'
                mt='2px'
                width='26px'
                src={TiktokIcon.src}
              ></Box>
            </Link>
            <Link
              variant='body2'
              fontSize='14px'
              underline='none'
              href='https://www.facebook.com/profile.php?id=100087054543656'
              mx='2px'
              target='_blank'
            >
              <FacebookIcon width='30px' />
            </Link>
            <Link
              variant='body2'
              fontSize='14px'
              underline='none'
              href='https://www.instagram.com/united.used.cars/'
              mx='2px'
              target='_blank'
            >
              <InstagramIcon width='30px' />
            </Link>
            <Link
              variant='body2'
              fontSize='14px'
              underline='none'
              href='https://wa.me/+19122395061'
              mx='2px'
              target='_blank'
            >
              <WhatsAppIcon width='30px' />
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
