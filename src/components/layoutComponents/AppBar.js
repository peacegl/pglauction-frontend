import {SearchIconBox} from '@crema/core/AppSearchBar/index.style';
import {useAuthMethod, useAuthUser} from '@crema/utility/AuthHooks';
import IntlMessages from '@crema/utility/IntlMessages';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import {useRouter} from 'next/router';
import Box from '@mui/material/Box';
import {useState} from 'react';
import VehicleSearchBar from './VehicleSearchBar';
import {useDispatch, useSelector} from 'react-redux';
import {useTheme} from '@mui/material';
import {setVehicleSearch} from 'redux/actions';

export const pages = [
  {title: <IntlMessages id='website.home' />, link: '/'},
  {title: <IntlMessages id='website.all_vehicles' />, link: '/all-vehicles'},
  {title: <IntlMessages id='website.live_auctions' />, link: '/live-auctions'},
  {title: <IntlMessages id='website.services' />, link: '/services'},
  {title: <IntlMessages id='website.contact_us' />, link: '/contact-us'},
  {title: <IntlMessages id='website.about_us' />, link: '/about-us'},
];
const settings = [
  {title: <IntlMessages id='common.admin' />, link: '/admin/vehicles'},
  {title: <IntlMessages id='common.account' />, link: '/account'},
  {title: <IntlMessages id='common.logout' />, link: 'logout'},
];

const signOptions = [
  {title: <IntlMessages id='common.signIn' />, link: 'signin'},
  {title: <IntlMessages id='common.signup' />, link: '/signup'},
];

function TopMenu() {
  const [openSignInModal, setOpenSignInModal] = useState(false);
  const {logout} = useAuthMethod();
  const {user, isLoading} = useAuthUser();
  const router = useRouter();
  const dispatch = useDispatch();
  const theme = useTheme();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const {search = ''} = useSelector(({webVehicles}) => webVehicles);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = (link) => {
    setAnchorElUser(null);
    if (link == 'logout') {
      logout();
    }
  };
  const changePage = (link) => {
    router.push(link);
  };
  const openAdminPanel = () => {
    router.push('/admin/vehicles');
  };

  const onSearch = (value) => {
    router.push('/all-vehicles');
    dispatch(setVehicleSearch(value));
  };

  return (
    <AppBar position='static'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
            <VehicleSearchBar
              placeholder='Search Inventory By Make, Model, Vin, and More...'
              onEnter={onSearch}
              onSearch={onSearch}
              defaultValue={search}
              sx={{
                width: {xs: '60vw'},
                margin: 'auto',
                backgroundColor: 'white',
                borderColor: 'white',
                color: theme.palette.primary.main,
              }}
            />
          </Box>

          <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
            {pages.map((page) => (
              <Button
                key={page.link}
                onClick={() => changePage(page.link)}
                alignItems='center'
                sx={{my: 2, color: 'white', display: 'block'}}
              >
                {page.title}
              </Button>
            ))}
          </Box>

          {/* <Button
            onClick={openAdminPanel}
            alignItems='center'
            sx={{my: 2, color: 'white', display: 'block'}}
          >
            Admin Panel
          </Button> */}
          {user ? (
            <Box sx={{flexGrow: 0}}>
              <Tooltip title='Open settings'>
                <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                  <Avatar alt='Remy Sharp' src='/static/images/avatar/2.jpg' />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{mt: '45px'}}
                id='menu-appbar'
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting.title}
                    onClick={() => handleCloseUserMenu(setting.link)}
                  >
                    <Typography textAlign='center'>{setting.title}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          ) : (
            <Box sx={{flexGrow: 0, display: 'flex'}}>
              {signOptions.map((page) => (
                <Button
                  key={page.link}
                  onClick={() => changePage(page.link)}
                  alignItems='center'
                  sx={{my: 2, color: 'white', display: 'block'}}
                >
                  {page.title}
                </Button>
              ))}
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default TopMenu;
