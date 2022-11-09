import {BiAlignLeft} from 'react-icons/bi';
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CategoryIcon from '@mui/icons-material/Category';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';

const routesConfig = [
  {
    id: 'vehicles',
    title: 'Vehicle List',
    messageId: 'sidebar.vehicles',
    type: 'item',
    icon: <DriveEtaIcon sx={{fontSize: 22}} />,
    url: '/admin/vehicles',
  },
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
];
export default routesConfig;
