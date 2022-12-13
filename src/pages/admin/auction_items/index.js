import {VIEW_AUCTION_ITEMS} from 'shared/constants/Permissions';
import asyncComponent from '@crema/utility/asyncComponent';
import {useAuthUser} from '@crema/utility/AuthHooks';
import Error403 from 'modules/errorPages/Error403';
import AppPage from '@crema/hoc/AppPage';

const AuctionItems = asyncComponent(() =>
  import('modules/admin/auction_items'),
);
export default AppPage(() => {
  const {user} = useAuthUser();
  return user?.permissions?.includes(VIEW_AUCTION_ITEMS) ? (
    <AuctionItems user={user} />
  ) : (
    <Error403 />
  );
});
