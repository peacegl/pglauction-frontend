import React from 'react';
import AppPage from '../../@crema/hoc/WebPage';
import asyncComponent from '../../@crema/utility/asyncComponent';

const Vehicles = asyncComponent(() => import('../../modules/website/vehicles'));
export default AppPage(() => <Vehicles />);
