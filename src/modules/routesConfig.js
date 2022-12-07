import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CategoryIcon from '@mui/icons-material/Category';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import SellIcon from '@mui/icons-material/Sell';
import StorefrontIcon from '@mui/icons-material/Storefront';
import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic';
import AssistantIcon from '@mui/icons-material/Assistant';

const routesConfig = [
  {
    id: 'vehicles',
    title: 'Vehicle List',
    messageId: 'sidebar.vehicles',
    type: 'item',
    icon: <DriveEtaIcon sx={{fontSize: 22}} />,
    url: '/admin/vehicles',
  },
  // {
  //   id: 'auctions',
  //   title: 'Auction List',
  //   messageId: 'sidebar.auctions',
  //   type: 'item',
  //   icon: <StorefrontIcon sx={{fontSize: 22}} />,
  //   url: '/admin/auctions',
  // },
  // {
  //   id: 'auction_items',
  //   title: 'Auction Item List',
  //   messageId: 'sidebar.auctionItems',
  //   type: 'item',
  //   icon: <SellIcon sx={{fontSize: 22}} />,
  //   url: '/admin/auction_items',
  // },
  {
    id: 'users',
    title: 'User List',
    messageId: 'sidebar.users',
    type: 'item',
    icon: <SupervisorAccountIcon sx={{fontSize: 22}} />,
    url: '/admin/users',
  },
  {
    id: 'customers',
    title: 'Customer List',
    messageId: 'sidebar.customers',
    type: 'item',
    icon: <PeopleAltIcon sx={{fontSize: 22}} />,
    url: '/admin/customers',
  },
  {
    id: 'roles',
    title: 'Roles List',
    messageId: 'sidebar.roles',
    type: 'item',
    icon: <VerifiedUserIcon sx={{fontSize: 21}} />,
    url: '/admin/roles',
  },
  {
    id: 'permissions',
    title: 'Permissions List',
    messageId: 'sidebar.permissions',
    type: 'item',
    icon: <ManageAccountsIcon sx={{fontSize: 22}} />,
    url: '/admin/permissions',
  },
  {
    id: 'categories',
    title: 'Category List',
    messageId: 'sidebar.categories',
    type: 'item',
    icon: <CategoryIcon sx={{fontSize: 22}} />,
    url: '/admin/categories',
  },
  {
    id: 'locations',
    title: 'Location List',
    messageId: 'sidebar.locations',
    type: 'item',
    icon: <LocationOnIcon sx={{fontSize: 22}} />,
    url: '/admin/locations',
  },
  {
    id: 'makes',
    title: 'Make List',
    messageId: 'sidebar.makes',
    type: 'item',
    icon: <AutoAwesomeMosaicIcon sx={{fontSize: 22}} />,
    url: '/admin/makes',
  },
  {
    id: 'models',
    title: 'Model List',
    messageId: 'sidebar.models',
    type: 'item',
    icon: <AssistantIcon sx={{fontSize: 22}} />,
    url: '/admin/models',
  },
];
export default routesConfig;
