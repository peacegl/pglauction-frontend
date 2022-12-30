import CustomerAdminPanel from './CustomerAdminPanel';
import PropTypes from 'prop-types';

const MyAccount = (user) => {
  return <CustomerAdminPanel user={user} />;
};

export default MyAccount;
MyAccount.propTypes = {
  user: PropTypes.any,
};
