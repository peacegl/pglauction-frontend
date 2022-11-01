import React from 'react';
import AppPage from '../../../@crema/hoc/AppPage';
import asyncComponent from '../../../@crema/utility/asyncComponent';

const Categories = asyncComponent(() =>
  import('../../../modules/admin/categories'),
);
export default AppPage(() => <Categories />);
