import routesConfig from '../../../../../modules/routesConfig';
import HorizontalCollapse from './HorizontalCollapse';
import {useAuthUser} from '@crema/utility/AuthHooks';
import HorizontalGroup from './HorizontalGroup';
import HorizontalItem from './HorizontalItem';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import React from 'react';

const HorizontalNav = () => {
  const {user} = useAuthUser();
  return (
    <List className='navbarNav'>
      {routesConfig.map((item) => (
        <React.Fragment key={item.id}>
          {item.type === 'group' && (
            <HorizontalGroup item={item} nestedLevel={0} />
          )}

          {item.type === 'collapse' && (
            <HorizontalCollapse item={item} nestedLevel={0} />
          )}

          {item.type === 'item' && (
            <HorizontalItem item={item} nestedLevel={0} />
          )}

          {item.type === 'divider' && <Divider sx={{my: 5}} />}
        </React.Fragment>
      ))}
    </List>
  );
};

export default HorizontalNav;
