import React from 'react';
import AppPage from '../@crema/hoc/WebPage';
import asyncComponent from '../@crema/utility/asyncComponent';

const Term = asyncComponent(() => import('../modules/website/terms/index'));
export default AppPage(() => <Term />);
