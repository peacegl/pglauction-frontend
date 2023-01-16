import React from 'react';
import AppPage from '../../@crema/hoc/WebPage';
import asyncComponent from '../../@crema/utility/asyncComponent';

const VerifyEmail = asyncComponent(() =>
  import('../../modules/website/verifyEmail'),
);
export default AppPage(() => <VerifyEmail />);
