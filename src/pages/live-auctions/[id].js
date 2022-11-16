import React from 'react';
import AppPage from '../../@crema/hoc/WebPage';
import asyncComponent from '../../@crema/utility/asyncComponent';

const AuctionDetail = asyncComponent(() =>
  import('../../modules/auctions/AuctionDetail'),
);
export default AppPage(() => <AuctionDetail />);
