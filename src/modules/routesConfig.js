import {BiAlignLeft} from 'react-icons/bi';
import GroupIcon from '@mui/icons-material/Group';

const routesConfig = [
  {
    id: 'app',
    title: 'Sample',
    messageId: 'sidebar.sample',
    type: 'group',
    children: [
      {
        id: 'users',
        title: 'Users List',
        messageId: 'sidebar.users',
        type: 'item',
        icon: <GroupIcon />,
        url: '/admin/users',
      },
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
