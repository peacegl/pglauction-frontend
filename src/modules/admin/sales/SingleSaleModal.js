import IntlMessages from '@crema/utility/IntlMessages';
import React, {useState, useLayoutEffect} from 'react';
import PropTypes from 'prop-types';
import Modal from '@mui/material/Modal';
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {Stack} from '@mui/material';
import {Box, List, Typography} from '@mui/material';
import Item from '../../../components/design/Item';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

export default function SingleSaleModal({open, toggleOpen, singleSale, width}) {
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
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
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
              <IntlMessages id='common.sale_information' />
            </Typography>
          </Box>
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
                  value={singleSale.str_code}
                />
                <Item
                  label={<IntlMessages id='common.vin' />}
                  value={singleSale.vin}
                />
                <Item
                  label={<IntlMessages id='common.lot_number' />}
                  value={singleSale.lot_number}
                />
                <Item
                  label={<IntlMessages id='common.buyer' />}
                  value={singleSale.buyer}
                />
                <Item
                  label={<IntlMessages id='sale.salePrice' />}
                  value={singleSale.sale_price}
                />
                <Item
                  label={<IntlMessages id='sale.saleDate' />}
                  value={singleSale.sale_date}
                />
              </List>
            </TabPanel>
            <TabPanel value='2'>
              <List
                sx={{px: 3, py: 0, width: '100%', bgcolor: 'background.paper'}}
              >
                <Item
                  label={<IntlMessages id='common.status' />}
                  value={singleSale.status}
                />
                <Item
                  label={<IntlMessages id='common.created_by' />}
                  value={singleSale.created_by}
                />
                <Item
                  label={<IntlMessages id='common.updated_by' />}
                  value={singleSale.updated_by}
                />
                <Item
                  label={<IntlMessages id='common.created_at' />}
                  value={singleSale.created_at}
                />
                <Item
                  label={<IntlMessages id='common.updated_at' />}
                  value={singleSale.updated_at}
                />
                {singleSale.description &&
                singleSale.description.length < 55 ? (
                  <Item
                    label={<IntlMessages id='common.description' />}
                    value={singleSale.description}
                  />
                ) : (
                  <Item
                    label={<IntlMessages id='common.description' />}
                    value={singleSale.description}
                    valueWidth={'80%'}
                  />
                )}
              </List>
            </TabPanel>
          </TabContext>
        </Box>
      </Card>
    </Modal>
  );
}

SingleSaleModal.propTypes = {
  open: PropTypes.bool.isRequired,
  toggleOpen: PropTypes.func.isRequired,
  singleSale: PropTypes.object.isRequired,
  width: PropTypes.number,
};
