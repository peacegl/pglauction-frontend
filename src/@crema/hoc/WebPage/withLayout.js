import AppBar from '../../../components/layoutComponents/AppBar';
import AppThemeSetting from '../../core/AppThemeSetting';
import Container from '@mui/material/Container';

const withLayout = (ComposedComponent) => (props) => {
  return (
    <div>
      <AppBar />
      <Container maxWidth='xl' sx={{mt: 4}}>
        <ComposedComponent {...props} />
      </Container>
    </div>
  );
};

export default withLayout;
