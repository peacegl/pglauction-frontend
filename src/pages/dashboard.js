import asyncComponent from '../@crema/utility/asyncComponent';
import {userInitialUrl} from 'shared/constants/AppConst';
import {useAuthUser} from '@crema/utility/AuthHooks';
import AppLoader from '@crema/core/AppLoader';
import Router, {useRouter} from 'next/router';
import AppPage from '../@crema/hoc/WebPage';
import React, {useEffect} from 'react';

const Dashboard = asyncComponent(() => import('../modules/customer/Dashboard'));
export default AppPage(() => {
  const {user, isLoading} = useAuthUser();
  const {asPath} = useRouter();
  const queryParams = asPath.split('?')[1];

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        Router.push('/signin' + (queryParams ? '?' + queryParams : ''));
      }
      if (user && user.type != 'Customer') {
        Router.push(userInitialUrl + (queryParams ? '?' + queryParams : ''));
      }
    }
  }, [user, isLoading]);
  if (!user || isLoading) return <AppLoader />;
  return <Dashboard />;
});
