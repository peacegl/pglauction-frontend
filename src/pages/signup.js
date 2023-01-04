import asyncComponent from '../@crema/utility/asyncComponent';
import {useAuthUser} from '@crema/utility/AuthHooks';
import AppLoader from '@crema/core/AppLoader';
import Router, {useRouter} from 'next/router';
import AppPage from '../@crema/hoc/WebPage';
import React, {useEffect} from 'react';
import {customerInitialUrl, userInitialUrl} from 'shared/constants/AppConst';

const SignUP = asyncComponent(() => import('../modules/auth/Signup/index'));
export default AppPage(() => {
  const {user, isLoading} = useAuthUser();
  const {asPath} = useRouter();
  const queryParams = asPath.split('?')[1];

  useEffect(() => {
    if (user && user.type == 'User') {
      Router.push(userInitialUrl + (queryParams ? '?' + queryParams : ''));
    }
    if (user && user.type == 'Customer') {
      Router.push(customerInitialUrl + (queryParams ? '?' + queryParams : ''));
    }
  }, [user]);
  if (isLoading) return <AppLoader />;
  return <SignUP />;
});
