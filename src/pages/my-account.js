import React from 'react';
import AppPage from '@crema/hoc/WebPage';
import asyncComponent from '@crema/utility/asyncComponent';

const ContactUs = asyncComponent(() => import('../modules/website/contactUs'));
export default AppPage(() => <ContactUs />);
