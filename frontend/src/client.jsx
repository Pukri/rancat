import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import configureStore from './store/configureStore';

import App from './containers/App';

import './assets/stylesheets/main.less';

const store = configureStore();

const app = document.getElementById('app');

const router = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(router, app);
