import React from 'react';
import AppPage from '@crema/hoc/AppPage';
import asyncComponent from '@crema/utility/asyncComponent';

const Dashboard = asyncComponent(() => import('modules/admin/dashboard'));
export default AppPage(() => <Dashboard />);
