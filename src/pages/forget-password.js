import {AppLoader} from '@crema';
import React, {useEffect} from 'react';
import AppPage from '../@crema/hoc/WebPage';
import Router, {useRouter} from 'next/router';
import {useAuthUser} from '@crema/utility/AuthHooks';
// import AppPage from '../@crema/hoc/DefaultPage/index'
import asyncComponent from '../@crema/utility/asyncComponent';
import {customerInitialUrl, userInitialUrl} from 'shared/constants/AppConst';

const ForgetPassword = asyncComponent(() =>
  import('../modules/auth/ForgetPassword/index'),
);
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
  return <ForgetPassword />;
});
