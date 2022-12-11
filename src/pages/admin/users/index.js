import asyncComponent from '@crema/utility/asyncComponent';
import {VIEW_USERS} from 'shared/constants/Permissions';
import {useAuthUser} from '@crema/utility/AuthHooks';
import Error403 from 'modules/errorPages/Error403';
import AppPage from '@crema/hoc/AppPage';

const Users = asyncComponent(() => import('modules/admin/users'));
export default AppPage(() => {
  const {user} = useAuthUser();
  return user?.permissions?.includes(VIEW_USERS) ? (
    <Users user={user} />
  ) : (
    <Error403 />
  );
});
