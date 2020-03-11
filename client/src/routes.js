import React from 'react';

import { asyncComponent } from '@jaredpalmer/after';

export default [
  {
    path: '/',
    exact: true,
    component: asyncComponent({
      loader: () => import('./container/Home'),
      Placeholder: () => <div>...LOADING...</div>,
    }),
  },
  {
    path: '/create-rate',
    exact: true,
    component: asyncComponent({
      loader: () => import('./container/CreateRatePage'),
      Placeholder: () => <div>...LOADING FAVORITES...</div>,
    }),
  },
  {
    path: '/rate-list/',
    exact: true,
    component: asyncComponent({
      loader: () => import('./container/RateList'),
      Placeholder: () => <div>...LOADING...</div>,
    }),
  },
  {
    path: '/me',
    exact: true,
    component: asyncComponent({
      loader: () => import('./container/MePage'),
      Placeholder: () => <div>...LOADING...</div>,
    }),
  },
  {
    path: '/card-rate/:id/',
    exact: true,
    component: asyncComponent({
      loader: () => import('./container/CardRate'),
      Placeholder: () => <div>...LOADING...</div>,
    }),
  },
  {
    path: '/auth',
    exact: true,
    component: asyncComponent({
      loader: () => import('./container/PageAuth'),
      Placeholder: () => <div>...LOADING...</div>,
    }),
  },
  {
    path: '/make-rate',
    exact: true,
    component: asyncComponent({
      loader: () => import('./container/MakeRate'),
      Placeholder: () => <div>...LOADING...</div>,
    }),
  },
  {
    path: '*',
    component: asyncComponent({
      loader: () => import('./container/NotFound'),
      Placeholder: () => <div>...DONT PAGE</div>,
    }),
  },
];
