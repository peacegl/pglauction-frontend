import React from 'react';
import AppPage from '@crema/hoc/WebPage';
import asyncComponent from '@crema/utility/asyncComponent';

const SingleAuctionItem = asyncComponent(() =>
  import('modules/website/auctions/AuctionItems/SingleAuctionItem'),
);

export default AppPage(() => <SingleAuctionItem />);
