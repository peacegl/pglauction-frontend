import React from 'react';
import AppPage from '../../../@crema/hoc/AppPage';
import asyncComponent from '../../../@crema/utility/asyncComponent';

const Sales = asyncComponent(() => import('../../../modules/admin/sales'));
export default AppPage(() => <Sales />);
