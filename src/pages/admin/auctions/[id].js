import React from 'react';
import AppPage from '../../../@crema/hoc/AppPage';
import asyncComponent from '../../../@crema/utility/asyncComponent';

const AuctionDetail = asyncComponent(() =>
  import('../../../modules/admin/auctions/AuctionDetails'),
);
export default AppPage(() => <AuctionDetail />);
