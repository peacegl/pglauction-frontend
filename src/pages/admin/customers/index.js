import React from 'react';
import AppPage from '../../../@crema/hoc/AppPage';
import asyncComponent from '../../../@crema/utility/asyncComponent';

const Customers = asyncComponent(() =>
  import('../../../modules/admin/customers'),
);
export default AppPage(() => <Customers />);
