import AppBar from '../../../components/layoutComponents/AppBar';
import AppThemeSetting from '../../core/AppThemeSetting';
import Container from '@mui/material/Container';
import Header from 'components/layoutComponents/Header';

const withLayout = (ComposedComponent) => (props) => {
  return (
    <div>
      <Header />
      <AppBar />
      <ComposedComponent {...props} />
    </div>
  );
};

export default withLayout;
