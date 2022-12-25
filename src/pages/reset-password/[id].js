import React from 'react';
import AppPage from '../../@crema/hoc/WebPage';
import asyncComponent from '../../@crema/utility/asyncComponent';

const ResetPassword = asyncComponent(() =>
  import('../../modules/website/ResetPassword'),
);
export default AppPage(() => <ResetPassword />);
