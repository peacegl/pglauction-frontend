import WebPage from '@crema/hoc/WebPage';
import asyncComponent from '@crema/utility/asyncComponent';
import React from 'react';

const AuctionSoftware = asyncComponent(() => import('../../modules/website/auction-software/index'));
export default WebPage(() => <AuctionSoftware />);
