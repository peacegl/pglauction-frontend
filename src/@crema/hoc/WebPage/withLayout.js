import AppBar from '../../../components/layoutComponents/AppBar';
import AppThemeSetting from '../../core/AppThemeSetting';
import Container from '@mui/material/Container';
import Header from 'components/layoutComponents/Header';
import Footer from 'components/layoutComponents/Footer';
import AppInfoView from '@crema/core/AppInfoView';

const withLayout = (ComposedComponent) => (props) => {
  return (
    <div>
      <Header />
      <AppBar />
      <ComposedComponent {...props} />
      <AppInfoView />
      <Footer />
    </div>
  );
};

export default withLayout;
