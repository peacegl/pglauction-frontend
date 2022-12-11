import {VIEW_AUCTIONS} from 'shared/constants/Permissions';
import asyncComponent from '@crema/utility/asyncComponent';
import {useAuthUser} from '@crema/utility/AuthHooks';
import Error403 from 'modules/errorPages/Error403';
import AppPage from '@crema/hoc/AppPage';

const Auctions = asyncComponent(() => import('modules/admin/auctions'));
export default AppPage(() => {
  const {user} = useAuthUser();
  return user?.permissions?.includes(VIEW_AUCTIONS) ? (
    <Auctions />
  ) : (
    <Error403 />
  );
});
