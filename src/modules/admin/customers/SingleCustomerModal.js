import IntlMessages from '@crema/utility/IntlMessages';
import React, {useState, useLayoutEffect} from 'react';
import PropTypes from 'prop-types';
import Modal from '@mui/material/Modal';
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {Avatar, Box, List, Typography, Chip} from '@mui/material';
import Item from '../../../components/vehicles/VehicleDetails/Item';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import AccountVerification from './AccountVerificationModal';
import CustomerStatus from './CustomerStatus';

export default function SingleCustomerModal({
  open,
  toggleOpen,
  singleCustomer,
  width,
}) {
  const [size, setSize] = useState([0]);
  const [value, setValue] = React.useState('1');
  const [recordId, setRecordId] = useState(null);
  const [openVerifyModal, setOpenVerifyModal] = useState(false);

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
            mt: {xs: 10, sm: 20, md: 20, lg: 30},
            mx: 'auto',
            overflow: {xs: 'auto', md: 'unset'},
            height: {xs: '90vh', md: 'unset'},
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
                <IntlMessages id='common.customerInfo' />
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

          <Box sx={{px: 3, pt: 3, pb: 6}}>
            <TabContext value={value}>
              <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
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
                    label={<IntlMessages id='common.code' />}
                    value={singleCustomer.str_code}
                  />
                  <Item
                    label={<IntlMessages id='common.username' />}
                    value={singleCustomer.username}
                  />
                  <Item
                    label={<IntlMessages id='common.fullname' />}
                    value={singleCustomer.fullname}
                  />
                  <Item
                    label={<IntlMessages id='common.phone' />}
                    value={singleCustomer.phone}
                  />
                  <Item
                    label={<IntlMessages id='common.whatsapp' />}
                    value={singleCustomer.whatsapp}
                  />
                  <Item
                    label={<IntlMessages id='common.gender' />}
                    value={singleCustomer.gender}
                  />
                  <Item
                    label={<IntlMessages id='common.email' />}
                    value={singleCustomer.email}
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
                  <Item
                    label={<IntlMessages id='customer.customer_status' />}
                    value={
                      <CustomerStatus
                        value={singleCustomer.customer_status}
                        id={singleCustomer.id}
                        setRecordId={setRecordId}
                        setOpenVerifyModal={setOpenVerifyModal}
                      />
                    }
                  />
                  <Item
                    label={<IntlMessages id='common.status' />}
                    value={singleCustomer.status}
                  />
                  <Item
                    label={<IntlMessages id='common.type' />}
                    value={singleCustomer.type}
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
                    label={<IntlMessages id='common.company' />}
                    value={singleCustomer.company}
                  />
                  <Item
                    label={<IntlMessages id='common.country' />}
                    value={singleCustomer.country}
                  />
                  <Item
                    label={<IntlMessages id='common.state' />}
                    value={singleCustomer.state}
                  />
                  <Item
                    label={<IntlMessages id='common.city' />}
                    value={singleCustomer.city}
                  />
                  <Item
                    label={<IntlMessages id='common.zipCode' />}
                    value={singleCustomer.zip_code}
                  />

                  {singleCustomer.identification_proof && (
                    <Item
                      label={<IntlMessages id='common.identificationProof' />}
                      value={
                        <a
                          href={singleCustomer.identification_proof}
                          target='_blank'
                          rel='noreferrer'
                        >
                          {`${singleCustomer.identification_proof_name} ${
                            singleCustomer.identification_proof_size &&
                            `(Size: ${singleCustomer.identification_proof_size})`
                          }`}
                        </a>
                      }
                    />
                  )}

                  <Item
                    label={<IntlMessages id='common.created_by' />}
                    value={singleCustomer.created_by}
                  />
                  <Item
                    label={<IntlMessages id='common.updated_by' />}
                    value={singleCustomer.updated_by}
                  />
                  <Item
                    label={<IntlMessages id='common.created_at' />}
                    value={singleCustomer.created_at}
                  />
                  <Item
                    label={<IntlMessages id='common.updated_at' />}
                    value={singleCustomer.updated_at}
                  />
                </List>
              </TabPanel>
            </TabContext>
          </Box>
        </Card>
      </Modal>

      {openVerifyModal && (
        <AccountVerification
          open={openVerifyModal}
          toggleOpen={() => setOpenVerifyModal((d) => !d)}
          recordId={recordId}
        />
      )}
    </>
  );
}

SingleCustomerModal.propTypes = {
  open: PropTypes.bool.isRequired,
  toggleOpen: PropTypes.func.isRequired,
  singleCustomer: PropTypes.object.isRequired,
  width: PropTypes.number,
};
