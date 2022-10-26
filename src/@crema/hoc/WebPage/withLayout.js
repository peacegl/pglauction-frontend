import AppBar from '../../../components/layoutComponents/AppBar';
import AppThemeSetting from '../../core/AppThemeSetting';

const withLayout = (ComposedComponent) => (props) => {
  return (
    <div>
      <AppBar />
      <ComposedComponent {...props} />
      <AppThemeSetting />
    </div>
  );
};

export default withLayout;
