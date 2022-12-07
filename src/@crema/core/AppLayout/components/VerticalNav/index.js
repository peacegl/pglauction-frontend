import routesConfig from '../../../../../modules/routesConfig';
import {useAuthUser} from '@crema/utility/AuthHooks';
import NavVerticalGroup from './VerticalNavGroup';
import VerticalCollapse from './VerticalCollapse';
import VerticalItem from './VerticalItem';
import {useRouter} from 'next/router';
import List from '@mui/material/List';
import React from 'react';

const VerticalNav = () => {
  const {user} = useAuthUser();
  const router = useRouter();
  return (
    <List
      sx={{
        position: 'relative',
        padding: 0,
      }}
      component='div'
    >
      {routesConfig.map((item) => (
        <React.Fragment key={item.id}>
          {item.type === 'group' && (
            <NavVerticalGroup item={item} level={0} router={router} />
          )}

          {item.type === 'collapse' && (
            <VerticalCollapse item={item} level={0} router={router} />
          )}

          {item.type === 'item' && item.permission
            ? user.permissions?.includes(item.permission)
            : true && <VerticalItem item={item} level={0} router={router} />}
        </React.Fragment>
      ))}
    </List>
  );
};

export default VerticalNav;
