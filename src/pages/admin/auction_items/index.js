import React from 'react';
import AppPage from '../../../@crema/hoc/AppPage';
import asyncComponent from '../../../@crema/utility/asyncComponent';

const Auctions = asyncComponent(() =>
  import('../../../modules/admin/auction_items'),
);
export default AppPage(() => <Auctions />);
