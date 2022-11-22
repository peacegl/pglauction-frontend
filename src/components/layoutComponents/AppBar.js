import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import {useRouter} from 'next/router';
import Box from '@mui/material/Box';
import {useState} from 'react';
import {AppSearchBar} from '@crema';

export const pages = [
  {title: 'Home', link: '/'},
  {title: 'Browse', link: '/'},
  {title: 'Search', link: '/'},
  {title: 'Live Auctions', link: '/live-auctions'},
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
