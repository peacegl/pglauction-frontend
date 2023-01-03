import {useThemeContext} from '@crema/utility/AppContextProvider/ThemeContextProvider';
import {Box, Container, Typography} from '@mui/material';
import SwipeableViews from 'react-swipeable-views';
import AdminPanelHeader from './AdminPanelHeader';
import PurchaseHistory from './PurchaseHistory';
import Account from 'modules/admin/Account';
import Dashboard from './dashboard';
import WatchList from './WatchList';
import PropTypes from 'prop-types';
import {useIntl} from 'react-intl';
import {useState} from 'react';

function TabPanel(props) {
  const {children, value, index, ...other} = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{p: 3}}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const CustomerAdminPanel = () => {
  const {theme} = useThemeContext();
  const [value, setValue] = useState(0);
  const {messages} = useIntl();

  const tabs = [
    // {
    //   key: 1,
    //   title: messages['common.dashboard'],
    //   child: <Dashboard />,
    // },
    {
      key: 2,
      title: messages['common.profile'],
      child: <Account />,
    },
    {
      key: 3,
      title: messages['common.myWatchlist'],
      child: <WatchList />,
    },
    // {
    //   key: 4,
    //   title: messages['common.purchaseHistory'],
    //   child: <PurchaseHistory />,
    // },
  ];
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <Container maxWidth='xl' sx={{mt: 6}}>
      <Box>
        <AdminPanelHeader
          value={value}
          handleChange={handleChange}
          tabs={tabs}
        />
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          {tabs.map((tab, i) => (
            <TabPanel value={value} index={i} key={i} dir={theme.direction}>
              <Box sx={{mb: 20}}>{tab.child}</Box>
            </TabPanel>
          ))}
        </SwipeableViews>
      </Box>
    </Container>
  );
};

export default CustomerAdminPanel;
