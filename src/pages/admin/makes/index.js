import React from 'react';
import AppPage from '../../../@crema/hoc/AppPage';
import asyncComponent from '../../../@crema/utility/asyncComponent';

const Makes = asyncComponent(() => import('../../../modules/admin/makes'));
export default AppPage(() => <Makes />);
