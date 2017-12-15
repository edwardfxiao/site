import models from '../models/index';
import _ from 'lodash';
import fs from 'fs';
import React from 'react';
import { renderToString } from 'react-dom/server';
import objectAssign from 'object-assign';
import { combineReducers } from 'redux';
import { Provider } from 'react-redux';
import createStore from '../frontend/js/store';
import { StaticRouter, Switch } from 'react-router-dom';
import App from '../frontend/js/app/app.js';

const index = async (ctx, _next) => {
  const prerenderHtml = await handleRender(
    ctx.state.preloadedState,
    <App />,
    ctx.request.url
  );
  const locals = {
    title: 'Edward Xiao',
    nav: 'index',
    prerenderHtml: prerenderHtml,
    baseUrl: '/'
  };
  await ctx.render('home/index', locals);
};

const about = async (ctx, _next) => {
  const readme = fs.readFileSync('README.md', 'utf8');
  const locals = {
    title: 'About',
    nav: 'about',
    content: readme
  };
  await ctx.render('home/about', locals);
};

const handleRender = async (preloadedState, component, url) => {
  let newState = {};
  Object.keys(preloadedState).map(key => {
    if (key !== 'csrf' && key !== 'captchaData' && key !== 'qiniuDomain') {
      newState[key] = preloadedState[key];
    }
  });
  const html = renderToString(
    <Provider store={createStore(newState)}>
      <StaticRouter location={url} context={{}}>
        {component}
      </StaticRouter>
    </Provider>
  );
  return html;
};

export default {
  index,
  about
};
