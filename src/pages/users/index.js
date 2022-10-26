import React from 'react';
import AppPage from '../../@crema/hoc/AppPage';
import asyncComponent from '../../@crema/utility/asyncComponent';

const Users = asyncComponent(() => import('../../modules/users'));
export default AppPage(() => <Users />);
