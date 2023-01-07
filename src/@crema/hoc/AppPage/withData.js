import React, {useEffect} from 'react';
import AppLoader from '../../core/AppLoader';
import Router, {useRouter} from 'next/router';
import {useAuthUser} from '../../utility/AuthHooks';
import {customerInitialUrl} from 'shared/constants/AppConst';

const withData = (ComposedComponent) => (props) => {
  const {user, isLoading} = useAuthUser();
  const {asPath} = useRouter();
  const queryParams = asPath.split('?')[1];
  useEffect(() => {
    if (!user && !isLoading) {
      Router.push('/signin' + (queryParams ? '?' + queryParams : ''));
    }
    if (user?.type == 'Customer') {
      Router.push(customerInitialUrl + (queryParams ? '?' + queryParams : ''));
    }
  }, [user, isLoading]);
  if (!user || isLoading) return <AppLoader />;

  return user.type != 'Customer' && <ComposedComponent {...props} />;
};
export default withData;
