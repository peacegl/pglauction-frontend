import {VIEW_VEHICLES} from 'shared/constants/Permissions';
import asyncComponent from '@crema/utility/asyncComponent';
import {useAuthUser} from '@crema/utility/AuthHooks';
import Error403 from 'modules/errorPages/Error403';
import AppPage from '@crema/hoc/AppPage';

const PendingVehicles = asyncComponent(() => import('modules/admin/vehicles/PendingVehicles'));
export default AppPage(() => {
  const {user} = useAuthUser();
  return user?.permissions?.includes(VIEW_VEHICLES) ? (
    <PendingVehicles user={user} />
  ) : (
    <Error403 />
  );
});
