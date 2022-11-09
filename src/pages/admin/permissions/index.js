import React from 'react';
import AppPage from '../../../@crema/hoc/AppPage';
import asyncComponent from '../../../@crema/utility/asyncComponent';

const Permissions = asyncComponent(() =>
  import('../../../modules/admin/permissions'),
);
export default AppPage(() => <Permissions />);
