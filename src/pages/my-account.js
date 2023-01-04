import React from 'react';
import AppPage from '@crema/hoc/WebPage';
import asyncComponent from '@crema/utility/asyncComponent';

const MyAccount = asyncComponent(() => import('../modules/website/myAccount'));
export default AppPage(() => <MyAccount />);
