import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import createHistory from 'history/createBrowserHistory';
import { Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';

import AppContainer from './containers/AppContainer';
import rootReducer from './reducers/index';
import styles  from '../src/styles/main';

const history = createHistory();
const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const middleware = routerMiddleware(history);
const store = createStore(rootReducer, devTools, applyMiddleware(middleware, logger, thunk));

const router = (
  <Provider store={ store }>
    <ConnectedRouter history={ history }>
      <Route path='/' component={AppContainer} />
    </ConnectedRouter>
  </Provider>
);


ReactDOM.render(router, document.getElementById('main'));