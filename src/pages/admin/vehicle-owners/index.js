import {VIEW_CUSTOMERS} from 'shared/constants/Permissions';
import asyncComponent from '@crema/utility/asyncComponent';
import {useAuthUser} from '@crema/utility/AuthHooks';
import Error403 from 'modules/errorPages/Error403';
import AppPage from '@crema/hoc/AppPage';

const VehicleOwners = asyncComponent(() => import('modules/admin/vehicle-owners'));
export default AppPage(() => {
  const {user} = useAuthUser();
  return user?.permissions?.includes(VIEW_CUSTOMERS) ? (
    <VehicleOwners user={user} />
  ) : (
    <Error403 />
  );
});
