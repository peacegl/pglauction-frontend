import React from 'react';
import AppPage from '../../@crema/hoc/WebPage';
import asyncComponent from '../../@crema/utility/asyncComponent';

const VehicleDetail = asyncComponent(() =>
  import('../../modules/website/vehicles/VehicleDetail'),
);
export default AppPage(() => <VehicleDetail />);
