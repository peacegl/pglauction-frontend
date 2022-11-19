import React from 'react';
import AppPage from '../../../@crema/hoc/AppPage';
import asyncComponent from '../../../@crema/utility/asyncComponent';

const Auctionitems = asyncComponent(() =>
  import('../../../modules/admin/auction_items'),
);
export default AppPage(() => <Auctionitems />);
