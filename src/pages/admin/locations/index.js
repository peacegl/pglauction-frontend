import React from 'react';
import AppPage from '../../../@crema/hoc/AppPage';
import asyncComponent from '../../../@crema/utility/asyncComponent';

const Locations = asyncComponent(() =>
  import('../../../modules/admin/locations'),
);
export default AppPage(() => <Locations />);
