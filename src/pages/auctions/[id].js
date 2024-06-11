import React from 'react';
import AppPage from '@crema/hoc/WebPage';
import asyncComponent from '@crema/utility/asyncComponent';

const AuctionItemList = asyncComponent(() =>
  import('modules/website/auctions/AuctionItems'),
);
export default AppPage(() => <AuctionItemList />);
