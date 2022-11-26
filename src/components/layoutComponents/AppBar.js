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
import {useState} from 'react';

export const pages = [
  {title: <IntlMessages id='website.home' />, link: '/'},
  {title: <IntlMessages id='website.all_vehicles' />, link: '/all-vehicles'},
  {title: <IntlMessages id='website.live_auctions' />, link: '/live-auctions'},
  {title: <IntlMessages id='website.services' />, link: '/services'},
  {title: <IntlMessages id='website.contact_us' />, link: '/contact-us'},
  {title: <IntlMessages id='website.about_us' />, link: '/about-us'},
];
const settings = ['Profile', 'Account', 'Logout'];

function TopMenu() {
  const router = useRouter();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const changePage = (link) => {
    router.push(link);
  };
  const openAdminPanel = () => {
    router.push('/admin/vehicles');
  };
  return (
    <AppBar position='static'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
            <AppSearchBar
              mdWidth='60vw'
              placeholder='Search Inventory By Make, Model, Vin, and More...'
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

          <Button
            onClick={openAdminPanel}
            alignItems='center'
            sx={{my: 2, color: 'white', display: 'block'}}
          >
            Admin Panel
          </Button>
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
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign='center'>{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default TopMenu;
