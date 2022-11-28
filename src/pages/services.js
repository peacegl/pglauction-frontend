import React from 'react';
import AppPage from '@crema/hoc/WebPage';
import asyncComponent from '@crema/utility/asyncComponent';

const Services = asyncComponent(() => import('../modules/website/services'));
export default AppPage(() => <Services />);
