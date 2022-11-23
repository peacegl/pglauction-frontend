import React from 'react';
import AppPage from '../../../@crema/hoc/AppPage';
import asyncComponent from '../../../@crema/utility/asyncComponent';

const Models = asyncComponent(() => import('../../../modules/admin/models'));
export default AppPage(() => <Models />);
