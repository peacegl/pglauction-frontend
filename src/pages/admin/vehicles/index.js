import {VIEW_VEHICLES} from 'shared/constants/Permissions';
import asyncComponent from '@crema/utility/asyncComponent';
import {useAuthUser} from '@crema/utility/AuthHooks';
import Error403 from 'modules/errorPages/Error403';
import AppPage from '@crema/hoc/AppPage';

const Vehicles = asyncComponent(() => import('modules/admin/vehicles'));
export default AppPage(() => {
  const {user} = useAuthUser();
  return user?.permissions?.includes(VIEW_VEHICLES) ? (
    <Vehicles />
  ) : (
    <Error403 />
  );
});
