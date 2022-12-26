import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import AppBar from 'components/layoutComponents/AppBar';
import Header from 'components/layoutComponents/Header';
import Footer from 'components/layoutComponents/Footer';
import AppInfoView from '@crema/core/AppInfoView';
import {useEffect, useState} from 'react';
import {Fab, Tooltip} from '@mui/material';
import IntlMessages from '@crema/utility/IntlMessages';

const withLayout = (ComposedComponent) => (props) => {
  const [visible, setVisible] = useState(false);
  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 200) {
      setVisible(true);
    } else if (scrolled <= 200) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  useEffect(() => {
    window.addEventListener('scroll', toggleVisible);
  }, []);
  return (
    <div>
      <Header />
      {/* <AppBar /> */}
      <ComposedComponent {...props} />
      <AppInfoView />
      <Footer />
      <Tooltip title={<IntlMessages id='common.scrollToTop' />} placement='top'>
        <Fab
          onClick={scrollToTop}
          size='small'
          color='primary'
          sx={{
            display: visible ? 'flex' : 'none',
            position: 'fixed',
            bottom: '20px',
            right: '50px',
            zIndex: 99,
          }}
        >
          <KeyboardArrowUpIcon />
        </Fab>
      </Tooltip>
    </div>
  );
};

export default withLayout;
