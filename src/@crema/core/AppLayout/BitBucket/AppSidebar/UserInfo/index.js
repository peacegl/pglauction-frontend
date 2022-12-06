import {useAuthMethod, useAuthUser} from '../../../../../utility/AuthHooks';
import {Fonts} from '../../../../../../shared/constants/AppEnums';
import IntlMessages from '@crema/utility/IntlMessages';
import orange from '@mui/material/colors/orange';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import {Box, alpha} from '@mui/material';
import Menu from '@mui/material/Menu';
import {useRouter} from 'next/router';

const UserInfo = () => {
  const {logout} = useAuthMethod();
  const {user} = useAuthUser();
  const history = useRouter();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const getUserAvatar = () => {
    if (user.displayName) {
      return user.displayName.charAt(0).toUpperCase();
    }
    if (user.email) {
      return user.email.charAt(0).toUpperCase();
    }
  };

  return (
    <Box
      sx={{
        py: 3,
        px: 3,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
      }}
    >
      <Box onClick={handleClick}>
        {user.photoURL ? (
          <Avatar
            sx={{
              height: 30,
              width: 30,
              backgroundColor: orange[500],
            }}
            src={user.photoURL}
          />
        ) : (
          <Avatar
            sx={{
              height: 30,
              width: 30,
              fontSize: 20,
              backgroundColor: orange[500],
            }}
          >
            {getUserAvatar()}
          </Avatar>
        )}
      </Box>
      <Menu
        id='simple-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        sx={{
          py: 4,
        }}
      >
        <MenuItem
          sx={{
            backgroundColor: (theme) => alpha(theme.palette.common.black, 0.08),
            px: 6,
            py: 3,
          }}
        >
          <Box
            sx={{
              mr: 3.5,
            }}
          >
            {user.photoURL ? (
              <Avatar
                sx={{
                  height: 40,
                  width: 40,
                }}
                src={user.photoURL}
              />
            ) : (
              <Avatar
                sx={{
                  height: 40,
                  width: 40,
                  fontSize: 20,
                  backgroundColor: orange[500],
                }}
              >
                {getUserAvatar()}
              </Avatar>
            )}
          </Box>

          <Box>
            <Box
              sx={{
                mb: 0,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                fontSize: 14,
                fontWeight: Fonts.MEDIUM,
              }}
              component='span'
            >
              {user.displayName}
            </Box>
            {user.roles && (
              <Box
                sx={{
                  mt: -0.5,
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  fontSize: 12,
                  textTransform: 'capitalize',
                  color: (theme) => theme.palette.text.secondary,
                }}
              >
                {user.roles[0]}
              </Box>
            )}
          </Box>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            history.push('/admin/my-account');
          }}
          sx={{
            px: 6,
            py: 1.5,
          }}
        >
          <IntlMessages id='common.my_account' />
        </MenuItem>
        <MenuItem
          sx={{
            px: 6,
            py: 1.5,
          }}
          onClick={logout}
        >
          <IntlMessages id='common.logout' />
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default UserInfo;
