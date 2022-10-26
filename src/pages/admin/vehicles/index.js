import React from 'react';
import AppPage from '../../../@crema/hoc/AppPage';
import asyncComponent from '../../../@crema/utility/asyncComponent';

const Auctions = asyncComponent(() =>
  import('../../../modules/admin/vehicles'),
);
export default AppPage(() => <Auctions />);
