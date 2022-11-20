import AppBar from '../../../components/layoutComponents/AppBar';
import AppThemeSetting from '../../core/AppThemeSetting';
import Container from '@mui/material/Container';

const withLayout = (ComposedComponent) => (props) => {
  return (
    <div>
      <AppBar />
      <ComposedComponent {...props} />
    </div>
  );
};

export default withLayout;
