import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

const AppNavLink = React.forwardRef((props, ref) => {
  const {to} = props;
  return (
    <Link innerRef={ref} href={to} {...props}>
      <>{props.children}</>
    </Link>
  );
});

export default AppNavLink;
AppNavLink.propTypes = {
  to: PropTypes.string,
  children: PropTypes.node,
};
