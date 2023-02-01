import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import AppBar from 'components/layoutComponents/AppBar';
import Header from 'components/layoutComponents/Header';
import Footer from 'components/layoutComponents/Footer';
import IntlMessages from '@crema/utility/IntlMessages';
import {useAuthUser} from '@crema/utility/AuthHooks';
import AppInfoView from '@crema/core/AppInfoView';
import ShopIcon from '@mui/icons-material/Shop';
import {Box, Fab, Tooltip} from '@mui/material';
import {useEffect, useState} from 'react';
import {webPages} from 'configs';
import {useMemo} from 'react';

const withLayout = (ComposedComponent) => (props) => {
  const [visible, setVisible] = useState(false);
  const {user} = useAuthUser();
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

  const pages = useMemo(() => {
    let pages = webPages;
    if (user?.type == 'Customer') {
      if (pages.filter((item) => item.key == 8).length == 0) {
        pages.unshift({
          key: 8,
          title: <IntlMessages id='sidebar.dashboard' />,
          children: [
            {
              title: <IntlMessages id='common.myWatchlist' />,
              link: '/dashboard/my-watchlist',
              target: '_self',
              icon: <BookmarksIcon />,
            },
            {
              title: <IntlMessages id='common.myPurchaseList' />,
              link: '/dashboard/my-purchaselist',
              target: '_self',
              icon: <ShopIcon />,
            },
          ],
        });
      }
    } else {
      pages = pages.filter((item) => item.key != 8);
    }
    return pages;
  }, [user?.type]);

  return (
    <Box sx={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
      <Box sx={{flex: 1}}>
        <Tooltip
          title={<IntlMessages id='common.scrollToTop' />}
          placement='top'
        >
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
        <Header pages={pages} />
        <AppBar pages={pages} />
        <ComposedComponent {...props} />
        <AppInfoView />
      </Box>
      <Footer />
    </Box>
  );
};

export default withLayout;
