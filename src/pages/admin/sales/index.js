import asyncComponent from '@crema/utility/asyncComponent';
import {VIEW_SALES} from 'shared/constants/Permissions';
import {useAuthUser} from '@crema/utility/AuthHooks';
import Error403 from 'modules/errorPages/Error403';
import AppPage from '@crema/hoc/AppPage';

const Sales = asyncComponent(() => import('modules/admin/sales'));
export default AppPage(() => {
  const {user} = useAuthUser();
  return user?.permissions?.includes(VIEW_SALES) ? (
    <Sales user={user} />
  ) : (
    <Error403 />
  );
});
