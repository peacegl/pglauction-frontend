import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {styled, alpha} from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import Menu from '@mui/material/Menu';
import PropTypes from 'prop-types';

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({theme}) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light'
        ? 'rgb(55, 65, 81)'
        : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      // padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        // fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));

export default function CustomMenu(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [active, setActive] = useState(null);
  const open = Boolean(anchorEl);
  const router = useRouter();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    props?.page?.children?.forEach((item, index) => {
      if (router.asPath == item.link) {
        setActive(index);
      }
    });
  }, [router?.asPath]);

  return (
    <div>
      <Button
        id='demo-customized-button'
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
        sx={{
          py: 2,
          color: 'white',
          bgcolor: (theme) =>
            props.index == props.active && theme.palette.primary.dark,
        }}
      >
        {props?.page?.title}
      </Button>
      <StyledMenu
        id='demo-customized-menu'
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {props.page?.children?.map((item, index) => (
          <MenuItem
            key={index}
            onClick={() => router.push(item.link)}
            sx={{
              color: (theme) => theme.palette.text.secondary,
              bgcolor: (theme) =>
                index == active &&
                alpha(
                  theme.palette.primary.main,
                  theme.palette.action.selectedOpacity,
                ),
            }}
          >
            {item.icon}
            {item.title}
          </MenuItem>
        ))}
      </StyledMenu>
    </div>
  );
}
CustomMenu.propTypes = {
  page: PropTypes.object.isRequired,
  index: PropTypes.number,
  active: PropTypes.number,
};
