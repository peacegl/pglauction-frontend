import {Box, Container, Typography} from '@mui/material';
import Account from 'modules/admin/Account';
import PropTypes from 'prop-types';

const CustomerAdminPanel = () => {
  return (
    <Container maxWidth='xl' sx={{mt: 6}}>
      <Account />
    </Container>
  );
};

export default CustomerAdminPanel;
