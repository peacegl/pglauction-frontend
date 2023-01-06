import {useAuthMethod, useAuthUser} from '@crema/utility/AuthHooks';
import {useCallback, useEffect, useMemo, useState} from 'react';
import IntlMessages from '@crema/utility/IntlMessages';
import {useDispatch, useSelector} from 'react-redux';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import VehicleSearchBar from './VehicleSearchBar';
import Container from '@mui/material/Container';
import {setVehicleSearch} from 'redux/actions';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import {useTheme} from '@mui/material';
import Menu from '@mui/material/Menu';
import {useRouter} from 'next/router';
import Box from '@mui/material/Box';
import Link from 'next/link';
import {pages} from 'configs';

const signOptions = [
  {
    title: <IntlMessages id='common.signIn' />,
    link: '/signin',
    target: '_self',
  },
  {title: <IntlMessages id='common.signup' />, link: '/signup'},
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
  const onSearch = (value) => {
    router.push('/all-vehicles');
    dispatch(setVehicleSearch(value));
  };

  const settings = useMemo(() => {
    const sets = [
      {
        key: 1,
        title: <IntlMessages id='common.logout' />,
        link: 'logout',
      },
    ];
    if (user?.type == 'User') {
      sets.unshift({
        key: 2,
        title: <IntlMessages id='common.admin_panel' />,
        link: '/admin/vehicles',
      });
    } else if (user?.type == 'Customer') {
      sets.unshift({
        key: 3,
        title: <IntlMessages id='common.my_account' />,
        link: '/my-account',
      });
    }
    return sets;
  }, [user?.type]);

  const addTodo = useCallback(() => {
    if (user?.type == 'Customer') {
      if (pages.filter((item) => item.link == '/dashboard').length == 0) {
        pages.unshift({
          title: <IntlMessages id='sidebar.dashboard' />,
          link: '/dashboard',
          target: '_self',
        });
      }
    }
  }, [user?.type]);

  useEffect(() => {
    addTodo();
  }, []);

  return (
    <AppBar position='static'>
      <Container maxWidth='xl'>
        <Toolbar
          disableGutters
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              flexGrow: 1,
              display: {xs: 'flex', md: 'none'},
              justifyContent: 'center',
              my: {xs: 2, sm: 0},
            }}
          >
            <VehicleSearchBar
              placeholder='Search Inventory By Make, Model, Vin, and More...'
              onEnter={onSearch}
              onSearch={onSearch}
              defaultValue={search}
              sx={{
                width: {xs: '60vw'},
                mx: 'auto',
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
