import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import SellIcon from '@mui/icons-material/Sell';
import StorefrontIcon from '@mui/icons-material/Storefront';
import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic';
import AssistantIcon from '@mui/icons-material/Assistant';
import HomeIcon from '@mui/icons-material/Home';
import {
  VIEW_VEHICLES,
  VIEW_USERS,
  VIEW_SALES,
  VIEW_CUSTOMERS,
  VIEW_LOCATIONS,
  VIEW_PERMISSIONS,
  VIEW_ROLES,
  VIEW_AUCTIONS,
  VIEW_AUCTION_ITEMS,
} from 'shared/constants/Permissions';

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
    permittedPermission: VIEW_VEHICLES,
  },

  // {
  //   id: 'vehicles',
  //   title: 'Vehicle List',
  //   messageId: 'sidebar.vehicles',
  //   type: 'collapse',
  //   icon: <DriveEtaIcon sx={{fontSize: 22}} />,
  //   url: '',
  //   children: [
  //     {
  //       id: 'all',
  //       title: 'All',
  //       messageId: 'sidebar.vehicles',
  //       type: 'item',
  //       icon: <DriveEtaIcon sx={{fontSize: 22}} />,
  //       url: '/admin/vehicles',
  //     },
  //   ],
  // },

  {
    id: 'sales',
    title: 'Sale List',
    messageId: 'sidebar.sales',
    type: 'item',
    icon: <SellIcon sx={{fontSize: 22}} />,
    url: '/admin/sales',
    permittedPermission: VIEW_SALES,
  },
  // {
  //   id: 'auctions',
  //   title: 'Auction List',
  //   messageId: 'sidebar.auctions',
  //   type: 'item',
  //   icon: <StorefrontIcon sx={{fontSize: 22}} />,
  //   url: '/admin/auctions',
  //   permittedPermission: VIEW_AUCTIONS,
  // },
  // {
  //   id: 'auction_items',
  //   title: 'Auction Item List',
  //   messageId: 'sidebar.auctionItems',
  //   type: 'item',
  //   icon: <SellIcon sx={{fontSize: 22}} />,
  //   url: '/admin/auction_items',
  //   permittedPermission: VIEW_AUCTION_ITEMS,
  // },
  {
    id: 'users',
    title: 'User List',
    messageId: 'sidebar.users',
    type: 'item',
    icon: <SupervisorAccountIcon sx={{fontSize: 22}} />,
    url: '/admin/users',
    permittedPermission: VIEW_USERS,
  },
  {
    id: 'customers',
    title: 'Customer List',
    messageId: 'sidebar.customers',
    type: 'item',
    icon: <PeopleAltIcon sx={{fontSize: 22}} />,
    url: '/admin/customers',
    permittedPermission: VIEW_CUSTOMERS,
  },
  {
    id: 'roles',
    title: 'Roles List',
    messageId: 'sidebar.roles',
    type: 'item',
    icon: <VerifiedUserIcon sx={{fontSize: 21}} />,
    url: '/admin/roles',
    permittedPermission: VIEW_ROLES,
  },
  {
    id: 'permissions',
    title: 'Permissions List',
    messageId: 'sidebar.permissions',
    type: 'item',
    icon: <ManageAccountsIcon sx={{fontSize: 22}} />,
    url: '/admin/permissions',
    permittedPermission: VIEW_PERMISSIONS,
  },
  {
    id: 'locations',
    title: 'Location List',
    messageId: 'sidebar.locations',
    type: 'item',
    icon: <LocationOnIcon sx={{fontSize: 22}} />,
    url: '/admin/locations',
    permittedPermission: VIEW_LOCATIONS,
  },
];
export default routesConfig;
