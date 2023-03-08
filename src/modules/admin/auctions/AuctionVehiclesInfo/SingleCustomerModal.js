import IntlMessages from '@crema/utility/IntlMessages';
import React, {useState, useLayoutEffect} from 'react';
import PropTypes from 'prop-types';
import Modal from '@mui/material/Modal';
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {Avatar, Box, List, Typography, Chip} from '@mui/material';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Item from 'components/design/Item';

export default function SingleCustomerModal({
  open,
  toggleOpen,
  singleCustomer,
  width,
}) {
  const [size, setSize] = useState([0]);
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
      <Modal open={open}>
        <Card
          sx={{
            mt: {xs: 5, md: 5, lg: 5, xl: 10},
            mx: 'auto',
            overflow: {xs: 'auto', s: 'auto', md: 'auto', lg: 'unset'},
            height: {xs: '700px', s: '700px', md: '700px', lg: 'unset'},
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
                  pt: 6,
                  pb: 3,
                  borderBottom: (theme) =>
                    `2px solid ${theme.palette.text.secondary}`,
                  borderRadius: '1px',
                  color: (theme) => theme.palette.primary.main,
                }}
              >
                <IntlMessages id='common.biderInfo' />
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              mx: 6,
              mt: 6,
              gap: 3,
            }}
          >
            <Avatar
              alt={'Profile picture'}
              src={singleCustomer.profile}
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
                  sx={{
                    px: 3,
                    py: 0,
                    width: '100%',
                    bgcolor: 'background.paper',
                  }}
                >
                  <Item
                    label={<IntlMessages id='common.username' />}
                    value={singleCustomer.username}
                  />
                  <Item
                    label={<IntlMessages id='common.fullname' />}
                    value={singleCustomer.loginable.fullname}
                  />
                  <Item
                    label={<IntlMessages id='common.phone' />}
                    value={singleCustomer.loginable.phone}
                  />
                  <Item
                    label={<IntlMessages id='common.whatsapp' />}
                    value={singleCustomer.loginable.whatsapp}
                  />

                  <Item
                    label={<IntlMessages id='common.email' />}
                    value={singleCustomer.email}
                  />
                  <Item
                    label={<IntlMessages id='common.type' />}
                    value={singleCustomer.type}
                  />
                  <Item
                    label={<IntlMessages id='common.account_type' />}
                    value={
                      singleCustomer.is_business == 0 ? (
                        <IntlMessages id='customer.business_account' />
                      ) : (
                        <IntlMessages id='customer.individual_account' />
                      )
                    }
                  />
                </List>
              </TabPanel>
              <TabPanel value='2'>
                <List
                  sx={{
                    px: 3,
                    py: 0,
                    width: '100%',
                    bgcolor: 'background.paper',
                  }}
                >
                  <Item
                    label={<IntlMessages id='common.birthDate' />}
                    value={singleCustomer.loginable.birth_date}
                  />

                  <Item
                    label={<IntlMessages id='common.status' />}
                    value={singleCustomer.status}
                  />

                  <Item
                    label={<IntlMessages id='common.gender' />}
                    value={singleCustomer.loginable.gender}
                  />

                  <Item
                    label={<IntlMessages id='common.created_by' />}
                    value={singleCustomer.loginable.created_by?.username}
                  />
                  <Item
                    label={<IntlMessages id='common.updated_by' />}
                    value={singleCustomer.loginable.updated_by?.username}
                  />
                  <Item
                    label={<IntlMessages id='common.created_at' />}
                    value={singleCustomer.loginable.created_at}
                  />
                  <Item
                    label={<IntlMessages id='common.updated_at' />}
                    value={singleCustomer.loginable.updated_at}
                  />
                </List>
              </TabPanel>
            </TabContext>
          </Box>
        </Card>
      </Modal>
    </>
  );
}

SingleCustomerModal.propTypes = {
  open: PropTypes.bool.isRequired,
  toggleOpen: PropTypes.func.isRequired,
  singleCustomer: PropTypes.object.isRequired,
  width: PropTypes.number,
};
