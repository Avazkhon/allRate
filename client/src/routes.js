import React from 'react';

import { asyncComponent } from '@jaredpalmer/after';

export default [
  {
    path: '/',
    exact: true,
    component: asyncComponent({
      loader: () => import('./container/Home'),
      Placeholder: () => <div>...LOADING HOMEPAGE...</div>,
    }),
  },
  {
    path: '/create-rates-list',
    exact: true,
    component: asyncComponent({
      loader: () => import('./container/CreateRatesList'),
      Placeholder: () => <div>...LOADING FAVORITES...</div>,
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
    path: '/rate-list',
    exact: true,
    component: asyncComponent({
      loader: () => import('./container/RateList'),
      Placeholder: () => <div>...LOADING FAVORITES...</div>,
    }),
  },
  {
    path: '/me',
    exact: true,
    component: asyncComponent({
      loader: () => import('./container/MePage'),
      Placeholder: () => <div>...LOADING FAVORITES...</div>,
    }),
  },
  {
    path: '/rate/:imdbID/',
    exact: true,
    component: asyncComponent({
      loader: () => import('./container/CardRate'),
      Placeholder: () => <div>...LOADING CARD FILM...</div>,
    }),
  },
  {
    path: '/auth',
    exact: true,
    component: asyncComponent({
      loader: () => import('./container/PageAuth'),
      Placeholder: () => <div>...LOADING CARD FILM...</div>,
    }),
  },
  // {
  //   path: '*',
  //   component: asyncComponent({
  //     loader: () => import('./container/Notfound'),
  //     Placeholder: () => <div>...DONT PAGE</div>,
  //   }),
  // },
];
