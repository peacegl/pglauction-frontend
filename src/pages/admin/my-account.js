import React from 'react';
import AppPage from '../../@crema/hoc/AppPage';
import asyncComponent from '../../@crema/utility/asyncComponent';

const Page1 = asyncComponent(() => import('../../modules/admin/Account'));
export default AppPage(() => <Page1 />);
