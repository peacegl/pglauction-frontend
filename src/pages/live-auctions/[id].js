import React from 'react';
import AppPage from '../../@crema/hoc/WebPage';
import asyncComponent from '../../@crema/utility/asyncComponent';

const AuctionDetail = asyncComponent(() =>
  import('../../modules/auction_items/AuctionDetail'),
);
export default AppPage(() => <AuctionDetail />);
