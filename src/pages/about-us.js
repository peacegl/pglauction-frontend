import React from 'react';
import AppPage from '@crema/hoc/WebPage';
import asyncComponent from '@crema/utility/asyncComponent';

const AboutUs = asyncComponent(() => import('../modules/website/aboutUs'));
export default AppPage(() => <AboutUs />);
