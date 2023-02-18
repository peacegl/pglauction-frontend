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

export default function SingleLocationModal({
  open,
  toggleOpen,
  singleLocation,
  width,
}) {
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
              <IntlMessages id='location.locationInfo' />
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
                  label={<IntlMessages id='common.code' />}
                  value={singleLocation.str_code}
                />
                <Item
                  label={<IntlMessages id='common.name' />}
                  value={singleLocation.name}
                />
                <Item
                  label={<IntlMessages id='common.slug' />}
                  value={singleLocation.slug}
                />
                <Item
                  label={<IntlMessages id='common.parent_name' />}
                  value={singleLocation.parent_name}
                />
                <Item
                  label={<IntlMessages id='common.created_by' />}
                  value={singleLocation.created_by}
                />
              </List>
              <List
                sx={{px: 3, py: 0, width: '100%', bgcolor: 'background.paper'}}
              >
                <Item
                  label={<IntlMessages id='common.updated_by' />}
                  value={singleLocation.updated_by}
                />
                <Item
                  label={<IntlMessages id='common.created_at' />}
                  value={singleLocation.created_at}
                />
                <Item
                  label={<IntlMessages id='common.updated_at' />}
                  value={singleLocation.updated_at}
                />
              </List>
            </Stack>
          </Stack>
        </Box>
      </Card>
    </Modal>
  );
}

SingleLocationModal.propTypes = {
  open: PropTypes.bool.isRequired,
  toggleOpen: PropTypes.func.isRequired,
  singleLocation: PropTypes.object.isRequired,
  width: PropTypes.number,
};
