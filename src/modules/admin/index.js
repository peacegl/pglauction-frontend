import React from 'react';

export const adminConfig = [
  {
    permittedRole: 'view_vehicless',
    path: '/admin/vehicles',
    component: React.lazy(() => import('./vehicles')),
  },

  {
    permittedRole: 'view_s',
    path: '/admin/invoice-2',
    component: React.lazy(() => import('./Invoice2')),
  },

  {
    permittedRole: 'view_s',
    path: '/admin/invoice-3',
    component: React.lazy(() => import('./Invoice3')),
  },

  {
    permittedRole: 'view_s',
    path: '/admin/products',
    component: React.lazy(() => import('./Products')),
  },

  {
    permittedRole: 'view_s',
    path: '/admin/product_detail/:id?',
    component: React.lazy(() => import('./ProductDetail')),
  },

  {
    permittedRole: 'view_s',
    path: '/admin/customers',
    component: React.lazy(() => import('./Customers')),
  },

  {
    permittedRole: 'view_s',
    path: '/admin/checkout',
    component: React.lazy(() => import('./Checkout')),
  },

  {
    permittedRole: 'view_s',
    path: '/admin/cart',
    component: React.lazy(() => import('./Carts')),
  },

  {
    permittedRole: 'view_s',
    path: '/admin/orders',
    component: React.lazy(() => import('./Orders')),
  },

  {
    permittedRole: 'view_s',
    path: '/admin/confirmation',
    component: React.lazy(() => import('./Confirmation')),
  },
];
