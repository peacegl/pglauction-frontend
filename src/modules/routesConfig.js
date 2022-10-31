import {BiAlignLeft} from 'react-icons/bi';
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CategoryIcon from '@mui/icons-material/Category';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

const routesConfig = [
  {
    id: 'vehicles',
    title: 'Vehicle List',
    messageId: 'sidebar.vehicles',
    type: 'item',
    icon: <DriveEtaIcon />,
    url: '/admin/vehicles',
  },
  {
    id: 'users',
    title: 'User List',
    messageId: 'sidebar.users',
    type: 'item',
    icon: <SupervisorAccountIcon />,
    url: '/admin/users',
  },
  {
    id: 'customers',
    title: 'Customer List',
    messageId: 'sidebar.customers',
    type: 'item',
    icon: <PeopleAltIcon />,
    url: '/admin/customers',
  },
  {
    id: 'categories',
    title: 'Category List',
    messageId: 'sidebar.categories',
    type: 'item',
    icon: <CategoryIcon />,
    url: '/admin/category',
  },
  {
    id: 'locations',
    title: 'Location List',
    messageId: 'sidebar.locations',
    type: 'item',
    icon: <LocationOnIcon />,
    url: '/admin/locations',
  },
];
export default routesConfig;
