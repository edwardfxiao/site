import 'babel-polyfill';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { hydrate } from 'react-dom';
import createStore from './store';
import { Provider } from 'react-redux';
import App from './App/app.js';
hydrate(
  <Provider store={createStore()}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
