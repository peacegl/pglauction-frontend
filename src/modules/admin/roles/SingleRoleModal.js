import IntlMessages from '@crema/utility/IntlMessages';
import React, {useState, useLayoutEffect} from 'react';
import PropTypes from 'prop-types';
import Modal from '@mui/material/Modal';
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {Stack} from '@mui/material';
import {Box, List, Typography} from '@mui/material';
import Item from '../../../components/vehicles/VehicleDetails/Item';

export default function SingleRoleModal({open, toggleOpen, singleRole, width}) {
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
    <Modal open={open}>
      <Card
        sx={{
          mt: {xs: 30, sm: 30, md: 40, lg: 40},
          mx: 'auto',
          overflow: {xs: 'auto', md: 'unset'},
          height: {xs: '400px', md: 'unset'},
          width: width
            ? size >= width
              ? width
              : size - 10
            : size >= 900
            ? 900
            : size - 10,
          bgcolor: 'background.paper',
          boxShadow: 24,
          position: 'relative',
        }}
      >
        <Box>
          <IconButton
            aria-label='close'
            onClick={toggleOpen}
            sx={{float: 'right', display: 'flex', p: 5}}
          >
            <CloseIcon sx={{fontSize: 18}} />
          </IconButton>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              ml: 14,
            }}
          >
            <Typography
              variant='h3'
              sx={{
                textAlign: 'center',
                pt: 5,
                pb: 4,
                borderBottom: (theme) =>
                  `2px solid ${theme.palette.text.secondary}`,
                borderRadius: '1px',
                color: (theme) => theme.palette.primary.main,
              }}
            >
              <IntlMessages id='role.roleInfo' />
            </Typography>
          </Box>
        </Box>

        <Box sx={{px: 3, pt: 3, pb: 6}}>
          <Stack spacing={{xs: 5, md: 8}}>
            <Stack>
              <List
                sx={{px: 3, py: 0, width: '100%', bgcolor: 'background.paper'}}
              >
                <Item
                  label={<IntlMessages id='common.name' />}
                  value={singleRole.name}
                />
                <Item
                  label={<IntlMessages id='common.type' />}
                  value={singleRole.type}
                />
                <Item
                  label={<IntlMessages id='common.users_count' />}
                  value={singleRole.users_count}
                />
                <Item
                  label={<IntlMessages id='common.permissions_count' />}
                  value={singleRole.permissions_count}
                />
              </List>
              <List
                sx={{px: 3, py: 0, width: '100%', bgcolor: 'background.paper'}}
              >
                <Item
                  label={<IntlMessages id='common.created_by' />}
                  value={singleRole.created_by}
                />
                <Item
                  label={<IntlMessages id='common.updated_by' />}
                  value={singleRole.updated_by}
                />
                <Item
                  label={<IntlMessages id='common.created_at' />}
                  value={singleRole.created_at}
                />
                <Item
                  label={<IntlMessages id='common.updated_at' />}
                  value={singleRole.updated_at}
                />
              </List>
            </Stack>
          </Stack>
        </Box>
      </Card>
    </Modal>
  );
}

SingleRoleModal.propTypes = {
  open: PropTypes.bool.isRequired,
  toggleOpen: PropTypes.func.isRequired,
  singleRole: PropTypes.object.isRequired,
  width: PropTypes.number,
};
