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
import HomeIcon from '@mui/icons-material/Home';

const routesConfig = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    messageId: 'sidebar.dashboard',
    type: 'item',
    icon: <HomeIcon sx={{fontSize: 22}} />,
    url: '/admin/',
  },
  {
    id: 'vehicles',
    title: 'Vehicle List',
    messageId: 'sidebar.vehicles',
    type: 'item',
    icon: <DriveEtaIcon sx={{fontSize: 22}} />,
    url: '/admin/vehicles',
    permission: 'view_vehicles',
  },
  // {
  //   id: 'auctions',
  //   title: 'Auction List',
  //   messageId: 'sidebar.auctions',
  //   type: 'item',
  //   icon: <StorefrontIcon sx={{fontSize: 22}} />,
  //   url: '/admin/auctions',
  //   permission: 'view_auctions',
  // },
  // {
  //   id: 'auction_items',
  //   title: 'Auction Item List',
  //   messageId: 'sidebar.auctionItems',
  //   type: 'item',
  //   icon: <SellIcon sx={{fontSize: 22}} />,
  //   url: '/admin/auction_items',
  //   permission: 'view_auction_items',
  // },
  {
    id: 'users',
    title: 'User List',
    messageId: 'sidebar.users',
    type: 'item',
    icon: <SupervisorAccountIcon sx={{fontSize: 22}} />,
    url: '/admin/users',
    permission: 'view_users',
  },
  {
    id: 'customers',
    title: 'Customer List',
    messageId: 'sidebar.customers',
    type: 'item',
    icon: <PeopleAltIcon sx={{fontSize: 22}} />,
    url: '/admin/customers',
    permission: 'view_customers',
  },
  {
    id: 'roles',
    title: 'Roles List',
    messageId: 'sidebar.roles',
    type: 'item',
    icon: <VerifiedUserIcon sx={{fontSize: 21}} />,
    url: '/admin/roles',
    permission: 'view_roles',
  },
  {
    id: 'permissions',
    title: 'Permissions List',
    messageId: 'sidebar.permissions',
    type: 'item',
    icon: <ManageAccountsIcon sx={{fontSize: 22}} />,
    url: '/admin/permissions',
    permission: 'view_permissions',
  },
  {
    id: 'categories',
    title: 'Category List',
    messageId: 'sidebar.categories',
    type: 'item',
    icon: <CategoryIcon sx={{fontSize: 22}} />,
    url: '/admin/categories',
    permission: 'view_categories',
  },
  {
    id: 'locations',
    title: 'Location List',
    messageId: 'sidebar.locations',
    type: 'item',
    icon: <LocationOnIcon sx={{fontSize: 22}} />,
    url: '/admin/locations',
    permission: 'view_locations',
  },
  {
    id: 'makes',
    title: 'Make List',
    messageId: 'sidebar.makes',
    type: 'item',
    icon: <AutoAwesomeMosaicIcon sx={{fontSize: 22}} />,
    url: '/admin/makes',
    permission: 'view_makes',
  },
  {
    id: 'models',
    title: 'Model List',
    messageId: 'sidebar.models',
    type: 'item',
    icon: <AssistantIcon sx={{fontSize: 22}} />,
    url: '/admin/models',
    permission: 'view_models',
  },
];
export default routesConfig;
