import React from 'react';
import AppPage from '../../../@crema/hoc/AppPage';
import asyncComponent from '../../../@crema/utility/asyncComponent';

const VehicleDetail = asyncComponent(() =>
  import('../../../modules/admin/vehicles/VehicleDetail'),
);
export default AppPage(() => <VehicleDetail />);
