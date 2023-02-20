import IntlMessages from '@crema/utility/IntlMessages';
import React, {useState, useLayoutEffect} from 'react';
import PropTypes from 'prop-types';
import Modal from '@mui/material/Modal';
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {Stack} from '@mui/material';
import {Avatar, Box, List, Typography} from '@mui/material';
import Item from '../../../components/vehicles/VehicleDetails/Item';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

export default function singleUserModal({open, toggleOpen, singleUser, width}) {
  const [size, setSize] = useState([0]);
  const [value, setValue] = React.useState('1');

  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Modal open={open}>
      <Card
        sx={{
          mt: {xs: 10, sm: 20, md: 20, lg: 40},
          mx: 'auto',
          overflow: {xs: 'auto', md: 'unset'},
          height: {xs: '610px', md: 'unset'},
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
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
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
              justifyContent: 'center',
              ml: 12,
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
              <IntlMessages id='common.userInfo' />
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            mx: 6,
            mt: 6,
            gap: 3,
          }}
        >
          <Avatar
            alt={'Profile picture'}
            src={singleUser.profile}
            sx={{
              color: (theme) => theme.palette.primary.main,
              width: 150,
              height: 150,
            }}
            variant='rounded'
          />
        </Box>

        <Box sx={{px: 3, py: 4}}>
          <TabContext value={value}>
            <Box sx={{borderBottom: 1, borderColor: 'divider', mx: 6}}>
              <TabList
                centered
                onChange={handleChange}
                aria-label='lab API tabs example'
              >
                <Tab label='Basic Info' value='1' />
                <Tab label='Show More' value='2' />
              </TabList>
            </Box>
            <TabPanel value='1'>
              <List
                sx={{px: 3, py: 0, width: '100%', bgcolor: 'background.paper'}}
              >
                <Item
                  label={<IntlMessages id='common.code' />}
                  value={singleUser.str_code}
                />
                <Item
                  label={<IntlMessages id='common.username' />}
                  value={singleUser.username}
                />
                <Item
                  label={<IntlMessages id='common.fullname' />}
                  value={singleUser.fullname}
                />
                <Item
                  label={<IntlMessages id='common.phone' />}
                  value={singleUser.phone}
                />
                <Item
                  label={<IntlMessages id='common.whatsapp' />}
                  value={singleUser.whatsapp}
                />
                <Item
                  label={<IntlMessages id='common.gender' />}
                  value={singleUser.gender}
                />
                <Item
                  label={<IntlMessages id='common.email' />}
                  value={singleUser.email}
                />
              </List>
            </TabPanel>
            <TabPanel value='2'>
              <List
                sx={{px: 3, py: 0, width: '100%', bgcolor: 'background.paper'}}
              >
                <Item
                  label={<IntlMessages id='common.status' />}
                  value={singleUser.status}
                />
                <Item
                  label={<IntlMessages id='common.type' />}
                  value={singleUser.type}
                />
                <Item
                  label={<IntlMessages id='common.birthDate' />}
                  value={singleUser.birth_date}
                />
                <Item
                  label={<IntlMessages id='common.created_by' />}
                  value={singleUser.created_by}
                />
                <Item
                  label={<IntlMessages id='common.updated_by' />}
                  value={singleUser.updated_by}
                />
                <Item
                  label={<IntlMessages id='common.created_at' />}
                  value={singleUser.created_at}
                />
                <Item
                  label={<IntlMessages id='common.updated_at' />}
                  value={singleUser.updated_at}
                />
              </List>
            </TabPanel>
          </TabContext>
        </Box>
      </Card>
    </Modal>
  );
}

singleUserModal.propTypes = {
  open: PropTypes.bool.isRequired,
  toggleOpen: PropTypes.func.isRequired,
  singleUser: PropTypes.object.isRequired,
  width: PropTypes.number,
};
