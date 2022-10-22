const withData = (ComposedComponent) => (props) => {
  return <ComposedComponent {...props} />;
};

export default withData;
