import {BiAlignLeft} from 'react-icons/bi';
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import GroupIcon from '@mui/icons-material/Group';

const routesConfig = [
  {
    id: 'vehicles',
    title: 'Vehicles List',
    messageId: 'sidebar.vehicles',
    type: 'item',
    icon: <DriveEtaIcon />,
    url: '/admin/vehicles',
  },
  {
    id: 'users',
    title: 'Users List',
    messageId: 'sidebar.users',
    type: 'item',
    icon: <GroupIcon />,
    url: '/admin/users',
  },
  {
    id: 'app',
    title: 'Sample',
    messageId: 'sidebar.sample',
    type: 'group',
    children: [
      {
        id: 'page-1',
        title: 'Page 1',
        messageId: 'sidebar.sample.page1',
        type: 'item',
        icon: <BiAlignLeft />,
        url: '/admin/sample/page-1',
      },
      {
        id: 'page-2',
        title: 'Page 2',
        messageId: 'sidebar.sample.page2',
        type: 'item',
        icon: <BiAlignLeft />,
        url: '/admin/sample/page-2',
      },
    ],
  },
];
export default routesConfig;
