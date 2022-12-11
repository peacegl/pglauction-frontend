import {VIEW_LOCATIONS} from 'shared/constants/Permissions';
import asyncComponent from '@crema/utility/asyncComponent';
import {useAuthUser} from '@crema/utility/AuthHooks';
import Error403 from 'modules/errorPages/Error403';
import AppPage from '@crema/hoc/AppPage';

const Locations = asyncComponent(() => import('modules/admin/locations'));
export default AppPage(() => {
  const {user} = useAuthUser();
  return user?.permissions?.includes(VIEW_LOCATIONS) ? (
    <Locations user={user} />
  ) : (
    <Error403 />
  );
});
