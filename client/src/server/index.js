import React from 'react';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';

import express from 'express';
import cookie from 'cookie-parser';

import { render } from '@jaredpalmer/after';

import configureStore from 'store/configureStore';

import Layout from 'container/Layout';
import routes from '../routes';
import myDocument from './document';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const server = express();

server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .use(cookie())
  .get('/*', async (req, res) => {
    try {
      // Create a new Redux store instance
      const store = configureStore({}, req);
      global.currency = req.cookies.currency;
      // Grab the initial state from our Redux store
      const serverState = store.getState();
      const customRenderer = (node) => {
        const App = <Provider store={store}>{node}</Provider>;
        return {
          html: renderToString(App),
          serverState,
        };
      };

      const html = await render({
        req,
        res,
        routes,
        assets,
        document: myDocument(store),
        layout: Layout,
        customRenderer,
        store: store,
      });
      res.send(html);
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  });

export default server;
