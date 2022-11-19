import React from 'react';
import AppPage from '../../@crema/hoc/WebPage';
import asyncComponent from '../../@crema/utility/asyncComponent';

const LiveAuctions = asyncComponent(() =>
  import('../../modules/auction_items'),
);
export default AppPage(() => <LiveAuctions />);
