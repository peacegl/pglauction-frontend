import IntlMessages from '@crema/utility/IntlMessages';
import React, {useState, useLayoutEffect} from 'react';
import PropTypes from 'prop-types';
import Modal from '@mui/material/Modal';
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {Box, CardContent, Typography} from '@mui/material';
import PermissionRoles from './role_permissions';

export default function RolePermissionModal({open, toggleOpen, roleId, width}) {
  const [size, setSize] = useState([0]);

  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return (
    <>
      <Modal open={open} sx={{display: 'flex', alignItems: 'center'}}>
        <Card
          sx={{
            mx: 'auto',
            overflow: {xs: 'auto', s: 'auto', md: 'auto', lg: 'unset'},
            height: {xs: '700px', s: '700px', md: '700px', lg: 'auto'},
            width: width
              ? size >= width
                ? width
                : size - 10
              : size >= 900
              ? 900
              : size - 10,
            bgcolor: 'background.paper',
            boxShadow: 24,
          }}
        >
          <Box>
            <IconButton
              aria-label='close'
              onClick={toggleOpen}
              sx={{float: 'right', display: 'flex', mt: 2, mr: 2}}
            >
              <CloseIcon sx={{fontSize: 18}} />
            </IconButton>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'start',
                ml: 12,
              }}
            >
              <Typography
                variant='h3'
                sx={{
                  pt: 4,
                  pb: 3,
                  color: (theme) => theme.palette.primary.main,
                }}
              >
                <IntlMessages id='sidebar.pages.userList' />
              </Typography>
            </Box>
          </Box>
          <CardContent
            sx={{
              padding: '0 !important',
            }}
          >
            <PermissionRoles roleId={roleId} />
          </CardContent>
        </Card>
      </Modal>
    </>
  );
}

RolePermissionModal.propTypes = {
  open: PropTypes.bool.isRequired,
  toggleOpen: PropTypes.func.isRequired,
  roleId: PropTypes.any.isRequired,
  width: PropTypes.number,
};
