import asyncComponent from '@crema/utility/asyncComponent';
import {VIEW_ROLES} from 'shared/constants/Permissions';
import {useAuthUser} from '@crema/utility/AuthHooks';
import Error403 from 'modules/errorPages/Error403';
import AppPage from '@crema/hoc/AppPage';

const Roles = asyncComponent(() => import('modules/admin/roles'));
export default AppPage(() => {
  const {user} = useAuthUser();
  return user?.permissions?.includes(VIEW_ROLES) ? <Roles /> : <Error403 />;
});
