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
import {AppSearchBar} from '@crema';
import {useState, useEffect} from 'react';

export const pages = [
  {title: <IntlMessages id='website.home' />, link: '/'},
  {title: <IntlMessages id='website.all_vehicles' />, link: '/all-vehicles'},
  {title: <IntlMessages id='website.live_auctions' />, link: '/live-auctions'},
  {title: <IntlMessages id='website.services' />, link: '/services'},
  {title: <IntlMessages id='website.contact_us' />, link: '/contact-us'},
  {title: <IntlMessages id='website.about_us' />, link: '/about-us'},
];

const signOptions = [
  {title: <IntlMessages id='common.signIn' />, link: 'signin'},
  {title: <IntlMessages id='common.signup' />, link: '/signup'},
];

function TopMenu() {
  const {logout} = useAuthMethod();
  const {user, isLoading} = useAuthUser();
  const router = useRouter();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [settings, setSettings] = useState([
    {title: <IntlMessages id='common.my_account' />, link: '/my-account'},
    {title: <IntlMessages id='common.logout' />, link: 'logout'},
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
  useEffect(() => {
    if (user?.type == 'User') {
      if (settings.length == 2) {
        setSettings((d) => [
          {
            title: <IntlMessages id='common.admin_panel' />,
            link: '/admin/vehicles',
          },
          ...d.filter((item) => item.key != 1),
        ]);
      }
    }
  }, [user]);
  return (
    <AppBar position='static'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
            <AppSearchBar
              mdWidth='55vw'
              placeholder='Search Inventory By Make, Model, Vin, and More...'
              sx={{'& .MuiInputBase-input': {px: '42px !important'}}}
            />
            <IconButton onClick={this}>
              <SearchIconBox />
            </IconButton>
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
                {settings.map((setting) => (
                  <MenuItem
                    key={setting.title}
                    onClick={() => changePage(setting.link)}
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
