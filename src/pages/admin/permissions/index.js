import {VIEW_PERMISSIONS} from 'shared/constants/Permissions';
import asyncComponent from '@crema/utility/asyncComponent';
import {useAuthUser} from '@crema/utility/AuthHooks';
import Error403 from 'modules/errorPages/Error403';
import AppPage from '@crema/hoc/AppPage';

const Permissions = asyncComponent(() => import('modules/admin/permissions'));
export default AppPage(() => {
  const {user} = useAuthUser();
  return user?.permissions?.includes(VIEW_PERMISSIONS) ? (
    <Permissions user={user} />
  ) : (
    <Error403 />
  );
});
