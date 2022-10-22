import AppBar from '../../../components/layoutComponents/AppBar';
const withLayout = (ComposedComponent) => (props) => {
  return (
    <div>
      <AppBar />
      <ComposedComponent {...props} />;
    </div>
  );
};

export default withLayout;
