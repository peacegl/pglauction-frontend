import {authRouteConfig} from './auth';
import {userInitialUrl} from 'shared/constants/AppConst';
import {Redirect} from 'react-router-dom';
import Error403 from './errorPages/Error403';
import {adminConfigs} from './admin/index';
import React from 'react';

const authorizedStructure = {
  fallbackPath: '/signin',
  unAuthorizedComponent: <Error403 />,
  routes: [...adminConfigs],
};

const unAuthorizedStructure = {
  fallbackPath: userInitialUrl,
  routes: authRouteConfig,
};

const anonymousStructure = {
  routes: errorPagesConfigs.concat([
    {
      path: '/',
      exact: true,
      component: () => <Redirect to={userInitialUrl} />,
    },
  ]),
};

export {authorizedStructure, unAuthorizedStructure, anonymousStructure};
