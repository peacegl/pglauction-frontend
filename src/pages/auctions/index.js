import React from 'react';
import AppPage from '@crema/hoc/WebPage';
import asyncComponent from '@crema/utility/asyncComponent';

const Auctions = asyncComponent(() => import('modules/website/auctions'));
export default AppPage(() => <Auctions />);
