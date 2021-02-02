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
    path: '/users',
    exact: true,
    component: asyncComponent({
      loader: () => import('./container/UsersList'),
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
    path: ['/bets/:type', '/bets/:type/:subtype/', '/bets/:type/:subtype/:section'],
    exact: true,
    component: asyncComponent({
      loader: () => import('./container/RateList'),
      Placeholder: () => <div>...LOADING...</div>,
    }),
  },
  {
    path: '/posts/',
    exact: true,
    component: asyncComponent({
      loader: () => import('./container/PostList'),
      Placeholder: () => <div>...LOADING...</div>,
    }),
  },
  {
    path: '/post/:id',
    exact: true,
    component: asyncComponent({
      loader: () => import('./container/CardPost'),
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
    path: '/profile/:id/',
    exact: true,
    component: asyncComponent({
      loader: () => import('./container/Profile'),
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
    path: '/purse',
    exact: true,
    component: asyncComponent({
      loader: () => import('./container/Purse'),
      Placeholder: () => <div>...LOADING...</div>,
    }),
  },
  {
    path: '/password-recovery/:password',
    exact: true,
    component: asyncComponent({
      loader: () => import('./container/PasswordRecovery'),
      Placeholder: () => <div>...LOADING...</div>,
    }),
  },
  {
    path: '/translation/:status/',
    exact: true,
    component: asyncComponent({
      loader: () => import('./container/Translation'),
      Placeholder: () => <div>...LOADING...</div>,
    }),
  },
  {
    path: '/help',
    exact: true,
    component: asyncComponent({
      loader: () => import('./container/Help'),
      Placeholder: () => <div>...LOADING...</div>,
    }),
  },
  {
    path: '/admin/withdrawal-request',
    exact: true,
    component: asyncComponent({
      loader: () => import('./container/WithdrawalRequest'),
      Placeholder: () => <div>...LOADING...</div>,
    }),
  },
  {
    path: '/admin/support-list',
    exact: true,
    component: asyncComponent({
      loader: () => import('./container/SupportList'),
      Placeholder: () => <div>...LOADING...</div>,
    }),
  },
  {
    path: '/admin/support/',
    exact: true,
    component: asyncComponent({
      loader: () => import('./container/WorkWithSupport'),
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
