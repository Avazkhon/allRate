import App from './App';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import { hydrate } from 'react-dom';
// import { Provider } from 'react-redux'
//
// import store from './store/index';

hydrate(
  <BrowserRouter>
    <App />
  </BrowserRouter>
  ,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept();
}
