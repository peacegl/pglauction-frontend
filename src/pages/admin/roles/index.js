import React from 'react';
import AppPage from '../../../@crema/hoc/AppPage';
import asyncComponent from '../../../@crema/utility/asyncComponent';

const Roles = asyncComponent(() => import('../../../modules/admin/roles'));
export default AppPage(() => <Roles />);
