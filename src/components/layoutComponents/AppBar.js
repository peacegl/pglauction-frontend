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
import Link from 'next/link';

export const pages = [
  {title: <IntlMessages id='website.home' />, link: '/home', target: '_self'},
  {
    title: <IntlMessages id='website.all_vehicles' />,
    link: '/',
    target: '_self',
  },
  // {title: <IntlMessages id='website.live_auctions' />, link: '/live-auctions'},
  {
    title: <IntlMessages id='website.shipping' />,
    link: 'https://peacegl.com/',
    target: '_blank',
  },
  {
    title: <IntlMessages id='website.services' />,
    link: '/services',
    target: '_self',
  },
  {
    title: <IntlMessages id='website.contact_us' />,
    link: '/contact-us',
    target: '_self',
  },
  {
    title: <IntlMessages id='website.about_us' />,
    link: '/about-us',
    target: '_self',
  },
];

const signOptions = [
  {
    title: <IntlMessages id='common.signIn' />,
    link: '/signin',
    target: '_self',
  },
  // {title: <IntlMessages id='common.signup' />, link: '/signup'},
];

function TopMenu() {
  const {logout} = useAuthMethod();
  const {user, isLoading} = useAuthUser();
  const router = useRouter();

  const dispatch = useDispatch();
  const theme = useTheme();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const {search = ''} = useSelector(({webVehicles}) => webVehicles);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [settings, setSettings] = useState([
    user?.type == 'User'
      ? {
          title: <IntlMessages id='common.admin_panel' />,
          link: '/admin/vehicles',
        }
      : user?.type == 'Customer'
      ? {
          title: <IntlMessages id='common.my_account' />,
          link: '/my-account',
        }
      : null,
    {
      title: <IntlMessages id='common.logout' />,
      link: 'logout',
    },
  ]);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = (link) => {
    setAnchorElUser(null);
  };
  const changePage = (link) => {
    if (link == 'logout') {
      logout();
      return;
    }
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
            {pages.map((page, index) => (
              <Button
                key={index}
                sx={{my: 2, color: 'white', display: 'block'}}
              >
                <Link
                  href={page.link}
                  target={page.target}
                  style={{
                    color: 'white',
                    alignItems: 'center',
                    textDecoration: 'none',
                  }}
                >
                  {page.title}
                </Link>
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
                  <Avatar alt={user.username} src={user.photoURL} />
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
                {settings.map(
                  (setting, index) =>
                    setting && (
                      <MenuItem
                        key={index}
                        onClick={() => changePage(setting.link)}
                      >
                        <Typography textAlign='center'>
                          {setting.title}
                        </Typography>
                      </MenuItem>
                    ),
                )}
              </Menu>
            </Box>
          ) : (
            <Box sx={{flexGrow: 0, display: 'flex'}}>
              {signOptions.map((page, index) => (
                <Button
                  key={index}
                  onClick={() => changePage(page.link)}
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
