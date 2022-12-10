import React from 'react';
import AppPage from '../@crema/hoc/WebPage';
import asyncComponent from '../@crema/utility/asyncComponent';

const Policy = asyncComponent(() => import('../modules/website/policy/index'));
export default AppPage(() => <Policy />);
