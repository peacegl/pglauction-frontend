import React from 'react';
import AppPage from '@crema/hoc/WebPage';
import asyncComponent from '@crema/utility/asyncComponent';

const Error404 = asyncComponent(() =>
  import('../modules/errorPages/Error404/index'),
);
export default AppPage(() => <Error404 url='/' />);
