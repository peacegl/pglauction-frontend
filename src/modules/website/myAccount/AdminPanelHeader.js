import {Box, Tab, Tabs} from '@mui/material';
import PropTypes from 'prop-types';

const AdminPanelHeader = (props) => {
  return (
    <Box
      sx={{
        mx: 'auto',
        maxWidth: {xs: 320, sm: 480, md: 600, lg: 900},
        bgcolor: 'background.paper',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Tabs
        value={props.value}
        onChange={props.handleChange}
        centered
        variant='scrollable'
        scrollButtons
        allowScrollButtonsMobile
        aria-label='scrollable force tabs example'
      >
        {props.tabs.map((tab, i) => (
          <Tab label={tab.title} key={i} />
        ))}
      </Tabs>
    </Box>
  );
};

export default AdminPanelHeader;
AdminPanelHeader.propTypes = {
  value: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired,
  tabs: PropTypes.array.isRequired,
};
